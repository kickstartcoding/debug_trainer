module Breakers.ChangeFunctionArgs exposing (run, validCandidateData)

import Breakers.Utils exposing (BreakRunnerData)
import List.Extra as ListEx
import Model.SavedData exposing (ChangeData)
import Parsers.Generic.Segment
    exposing
        ( BreakStatus(..)
        , Segment
        , SegmentType(..)
        )
import Utils.FileContent as FileContent
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.NamedFunctionDeclaration as Function exposing (NamedFunctionDeclaration)


run : BreakRunnerData -> Maybe ( List Segment, ChangeData )
run { randomNumber, originalFileContent, segments } =
    segments
        |> Breakers.Utils.chooseCandidate randomNumber validCandidateData
        |> Maybe.map
            (\( index, { segment, data, newArguments } ) ->
                let
                    newFuncData =
                        { data | arguments = newArguments }

                    newFuncString =
                        Function.toString newFuncData

                    lineNumber =
                        FileContent.rowFromOffset (segment.offset + String.length segment.content) originalFileContent

                    newSegments =
                        ListEx.setAt index
                            (Segment segment.offset newFuncString (FunctionDeclaration newFuncData BreakHasBeenApplied))
                            segments
                in
                ( newSegments
                , { lineNumber = lineNumber
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
            )


type alias FunctionChangeData =
    { segment : Segment
    , data : NamedFunctionDeclaration
    , newArguments : List String
    }


validCandidateData : Segment -> Maybe FunctionChangeData
validCandidateData ({ segmentType } as segment) =
    case segmentType of
        FunctionDeclaration ({ arguments } as data) BreakNotAppliedYet ->
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
