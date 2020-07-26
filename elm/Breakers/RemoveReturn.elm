module Breakers.RemoveReturn exposing (run, validCandidateData)

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
                    lineNumber =
                        FileContent.rowFromOffset
                            (offset + String.length content - 1)
                            originalFileContent

                    newContent =
                        ListEx.setAt index (Segment offset (String.dropRight 7 content) ReturnStatement) segments
                            |> Breakers.Utils.segmentsToContent
                in
                { originalContent = originalFileContent
                , updatedContent = newContent
                , lineNumber = lineNumber
                , changeDescription = "removed a `return`"
                , breakType = RemoveReturn
                }
            )


validCandidateData : Segment -> Maybe Segment
validCandidateData ({ segmentType } as segment) =
    if segmentType == ReturnStatement then
        Just segment

    else
        Nothing
