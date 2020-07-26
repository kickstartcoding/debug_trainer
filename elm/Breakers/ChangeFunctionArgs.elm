module Breakers.ChangeFunctionArgs exposing (run, validCandidateData)

import Breakers.Utils
import List.Extra as ListEx
import Model.SavedData exposing (FileData)
import Parsers.Generic.Segment as Segment
    exposing
        ( FunctionDeclarationData
        , Segment
        , SegmentType(..)
        )
import Utils.FileContent as FileContent
import Utils.Types.BreakType exposing (BreakType(..))


run : { randomNumber : Int, originalFileContent : String, segments : List Segment } -> Maybe FileData
run { randomNumber, originalFileContent, segments } =
    segments
        |> Breakers.Utils.chooseCandidate randomNumber validCandidateData
        |> Maybe.map
            (\( index, { segment, data, newArguments } ) ->
                let
                    newFuncData =
                        { data | arguments = newArguments }

                    newFuncString =
                        Segment.functionDeclarationDataToString newFuncData

                    lineNumber =
                        FileContent.rowFromOffset (segment.offset + String.length segment.content) originalFileContent

                    newContent =
                        ListEx.setAt index
                            (Segment segment.offset newFuncString (FunctionDeclaration newFuncData))
                            segments
                            |> Breakers.Utils.segmentsToContent
                in
                { originalContent = originalFileContent
                , updatedContent = newContent
                , lineNumber = lineNumber
                , changeDescription =
                    case ( data.arguments, newArguments ) of
                        ( [ oldArg ], [] ) ->
                            "removed the `" ++ oldArg ++ "` argument from `" ++ data.name ++ "`"

                        ( arg1 :: arg2 :: _, _ ) ->
                            "switched the positions of `" ++ arg1 ++ "` and `" ++ arg2 ++ "` in `" ++ data.name ++ "`"

                        _ ->
                            "error writing change description: unexpected number of arguments"
                , breakType = ChangeFunctionArgs
                }
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
                    Nothing

                [ _ ] ->
                    Just (dataWithNewArgs [])

                arg1 :: arg2 :: tail ->
                    Just (dataWithNewArgs (arg2 :: arg1 :: tail))

        _ ->
            Nothing
