module Breakers.RemoveReturn exposing (run, validCandidateData)

import Breakers.Utils
import List.Extra as ListEx
import Model.SavedData exposing (Change)
import Parsers.Generic.Segment exposing (Segment, SegmentType(..))
import Utils.Types.BreakType exposing (BreakType(..))


run : Int -> List Segment -> Maybe ( String, Change )
run randomNumber segments =
    segments
        |> Breakers.Utils.chooseCandidate randomNumber validCandidateData
        |> Maybe.map
            (\( index, { content, offset } ) ->
                ( ListEx.setAt index (Segment offset (String.dropRight 7 content) ReturnStatement) segments
                    |> Breakers.Utils.segmentsToContent
                , { replacementData =
                        { originalContent =
                            { start = offset
                            , end = offset + String.length content
                            , content = content
                            }
                        , newContent =
                            { start = offset
                            , end = offset + String.length ""
                            , content = ""
                            }
                        }
                  , breakType = RemoveReturn
                  }
                )
            )


validCandidateData : Segment -> Maybe Segment
validCandidateData ({ segmentType } as segment) =
    if segmentType == ReturnStatement then
        Just segment

    else
        Nothing
