module Breakers.Utils exposing
    ( candidates
    , chooseCandidate
    , segmentsToContent
    )

import Parsers.Generic.Segment exposing (Segment, SegmentType(..))
import Utils.List


segmentsToContent : List Segment -> String
segmentsToContent segments =
    segments
        |> List.map .content
        |> List.foldr (++) ""


chooseCandidate : Int -> (Segment -> Bool) -> List Segment -> Maybe ( Int, Segment )
chooseCandidate randomNumber isCandidate segments =
    segments
        |> candidates isCandidate
        |> Utils.List.pickRandom randomNumber


candidates : (Segment -> Bool) -> List Segment -> List ( Int, Segment )
candidates isCandidate segments =
    segments
        |> List.indexedMap Tuple.pair
        |> List.filter (Tuple.second >> isCandidate)
