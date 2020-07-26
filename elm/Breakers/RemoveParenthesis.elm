module Breakers.RemoveParenthesis exposing (run, validCandidateData)

import Breakers.Utils
import List.Extra as ListEx
import Model.SavedData exposing (FileData)
import Parsers.Generic.Segment exposing (Segment, SegmentType(..))
import Utils.FileContent as FileContent
import Utils.Types.BreakType exposing (BreakType(..))


run : { randomNumber : Int, originalFileContent : String, segments : List Segment } -> Maybe FileData
run { randomNumber, originalFileContent, segments } =
    segments
        |> Breakers.Utils.chooseCandidate randomNumber validCandidateData
        |> Maybe.map
            (\( index, { content, offset } ) ->
                let
                    whereInTheLineIsTheBracket =
                        if String.startsWith "\n" content then
                            StartOfLine

                        else
                            EndOfLine

                    lineNumber =
                        originalFileContent
                            |> FileContent.rowFromOffset
                                (case whereInTheLineIsTheBracket of
                                    StartOfLine ->
                                        offset + 1

                                    EndOfLine ->
                                        offset
                                )

                    withoutBracket =
                        String.filter (not << isParenOrBracket) content

                    newContent =
                        ListEx.setAt index (Segment offset withoutBracket ReturnStatement) segments
                            |> Breakers.Utils.segmentsToContent
                in
                { originalContent = originalFileContent
                , updatedContent = newContent
                , lineNumber = lineNumber
                , changeDescription =
                    "removed a `"
                        ++ String.trim content
                        ++ "` from the "
                        ++ (case whereInTheLineIsTheBracket of
                                StartOfLine ->
                                    "beginning of the line"

                                EndOfLine ->
                                    "end of the line"
                           )
                , breakType = RemoveParenthesis
                }
            )


type WhereInLine
    = StartOfLine
    | EndOfLine


isParenOrBracket : Char -> Bool
isParenOrBracket char =
    List.member char [ '{', '}', '(', ')', '[', ']' ]


validCandidateData : Segment -> Maybe Segment
validCandidateData ({ segmentType } as segment) =
    if segmentType == ParenthesisOrBracket then
        Just segment

    else
        Nothing
