module Breakers.RemoveParenthesis exposing (run, validCandidateData)

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
                let
                    newContent =
                        String.filter (not << isParenOrBracket) content
                in
                ( ListEx.setAt index (Segment offset newContent ReturnStatement) segments
                    |> Breakers.Utils.segmentsToContent
                , { replacementData =
                        { originalContent =
                            { start = offset
                            , end = offset + String.length content
                            , content = content
                            }
                        , newContent =
                            { start = offset
                            , end = offset + String.length newContent
                            , content = newContent
                            }
                        }
                  , breakType = RemoveParenthesis
                  }
                )
            )


isParenOrBracket : Char -> Bool
isParenOrBracket char =
    List.member char [ '{', '}', '(', ')', '[', ']' ]


validCandidateData : Segment -> Maybe Segment
validCandidateData ({ segmentType } as segment) =
    if segmentType == ParenthesisOrBracket then
        Just segment

    else
        Nothing
