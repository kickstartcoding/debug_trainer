module Parsers.Generic.Segment exposing
    ( Segment(..)
    , toString
    , wordsWithIndicesWhere
    )


type Segment
    = Word String
    | Whitespace String
    | Other String


wordsWithIndicesWhere : (String -> Bool) -> List Segment -> List ( Int, String )
wordsWithIndicesWhere condition segmentList =
    segmentList
        |> List.indexedMap Tuple.pair
        |> List.filter (Tuple.second >> isWordAnd condition)
        |> List.map (Tuple.mapSecond toString)


isWordAnd : (String -> Bool) -> Segment -> Bool
isWordAnd stringCondition segment =
    case segment of
        Word string ->
            stringCondition string

        _ ->
            False


toString : Segment -> String
toString segment =
    case segment of
        Word string ->
            string

        Whitespace string ->
            string

        Other string ->
            string
