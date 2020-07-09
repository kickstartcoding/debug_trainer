module Breakers.CaseSwap exposing (isCandidate, run)

import Breakers.Utils
import List.Extra as ListEx
import Model.SavedData exposing (Change)
import Parsers.Generic.Segment exposing (Segment, SegmentType(..))
import Utils.String as StrUtils
import Utils.Types.BreakType exposing (BreakType(..))


run : Int -> List Segment -> Maybe ( String, Change )
run randomNumber segments =
    segments
        |> Breakers.Utils.chooseCandidate randomNumber isCandidate
        |> Maybe.map
            (\( index, { content, offset } ) ->
                let
                    newWord =
                        StrUtils.toggleTitleCase content
                in
                ( ListEx.setAt index (Segment offset newWord Word) segments
                    |> Breakers.Utils.segmentsToContent
                , { replacementData =
                        { originalContent =
                            { start = offset
                            , end = offset + String.length content
                            , content = content
                            }
                        , newContent =
                            { start = offset
                            , end = offset + String.length newWord
                            , content = newWord
                            }
                        }
                  , breakType = CaseSwap
                  }
                )
            )


isCandidate : Segment -> Bool
isCandidate { content, segmentType } =
    segmentType
        == Word
        && StrUtils.isMoreThanOneCharacter content
        && not (StrUtils.isAllCaps content)
