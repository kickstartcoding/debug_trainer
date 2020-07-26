module Breakers.CaseSwap exposing (run, validCandidateData)

import Breakers.Utils
import List.Extra as ListEx
import Model.SavedData exposing (FileData)
import Parsers.Generic.Segment exposing (Segment, SegmentType(..))
import Utils.FileContent as FileContent
import Utils.String as StrUtils
import Utils.Types.BreakType exposing (BreakType(..))


run : { randomNumber : Int, originalFileContent : String, segments : List Segment } -> Maybe FileData
run { randomNumber, originalFileContent, segments } =
    segments
        |> Breakers.Utils.chooseCandidate randomNumber validCandidateData
        |> Maybe.map
            (\( index, { content, offset } ) ->
                let
                    newWord =
                        StrUtils.toggleTitleCase content

                    lineNumber =
                        FileContent.rowFromOffset offset originalFileContent

                    newContent =
                        ListEx.setAt index (Segment offset newWord Word) segments
                            |> Breakers.Utils.segmentsToContent
                in
                { originalContent = originalFileContent
                , updatedContent = newContent
                , lineNumber = lineNumber
                , changeDescription = "changed `" ++ content ++ "` to `" ++ newWord ++ "`"
                , breakType = CaseSwap
                }
            )


validCandidateData : Segment -> Maybe Segment
validCandidateData ({ content, segmentType } as segment) =
    if
        segmentType
            == Word
            && StrUtils.isMoreThanOneCharacter content
            && not (StrUtils.isAllCaps content)
    then
        Just segment

    else
        Nothing
