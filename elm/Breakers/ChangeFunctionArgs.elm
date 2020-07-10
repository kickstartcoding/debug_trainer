module Breakers.ChangeFunctionArgs exposing (run, validCandidateData)

import Breakers.Utils
import List.Extra as ListEx
import Model.SavedData exposing (Change)
import Parsers.Generic.Segment as Segment
    exposing
        ( FunctionDeclarationData
        , Segment
        , SegmentType(..)
        )
import Utils.Types.BreakType exposing (BreakType(..))


run : Int -> List Segment -> Maybe ( String, Change )
run randomNumber segments =
    segments
        |> Breakers.Utils.chooseCandidate randomNumber validCandidateData
        |> Maybe.map
            (\( index, { segment, data, newArguments } ) ->
                let
                    newFuncData =
                        { data | arguments = newArguments }

                    newFuncString =
                        Segment.functionDeclarationDataToString newFuncData
                in
                ( ListEx.setAt index
                    (Segment segment.offset newFuncString (FunctionDeclaration newFuncData))
                    segments
                    |> Breakers.Utils.segmentsToContent
                , { replacementData =
                        { originalContent =
                            { start = segment.offset
                            , end = segment.offset + String.length segment.content
                            , content = segment.content
                            }
                        , newContent =
                            { start = segment.offset
                            , end = segment.offset + String.length newFuncString
                            , content = newFuncString
                            }
                        }
                  , breakType = ChangeFunctionArgs
                  }
                )
            )


type alias FunctionChangeData =
    { segment : Segment
    , data : FunctionDeclarationData
    , newArguments : List String
    }


validCandidateData : Segment -> Maybe FunctionChangeData
validCandidateData ({ segmentType } as segment) =
    case segmentType of
        FunctionDeclaration ({ arguments } as data) ->
            let
                dataWithNewArgs newArgs =
                    { segment = segment
                    , data = data
                    , newArguments = newArgs
                    }
            in
            case arguments of
                [] ->
                    Just (dataWithNewArgs [ "num" ])

                [ _ ] ->
                    Just (dataWithNewArgs [])

                arg1 :: arg2 :: tail ->
                    Just (dataWithNewArgs (arg2 :: arg1 :: tail))

        _ ->
            Nothing
