module Parsers.Generic.Segment exposing
    ( Segment(..)
    , toString
    , wordsWithIndicesWhere
    )


type Segment
    = Word Int String
    | Whitespace Int String
    | Other Int String


wordsWithIndicesWhere : (String -> Bool) -> List Segment -> List { index : Int, offset : Int, content : String }
wordsWithIndicesWhere condition segmentList =
    segmentList
        |> List.indexedMap Tuple.pair
        |> List.filter (Tuple.second >> isWordAnd condition)
        |> List.map
            (\( index, segment ) ->
                { index = index
                , offset = getOffset segment
                , content = toString segment
                }
            )


isWordAnd : (String -> Bool) -> Segment -> Bool
isWordAnd stringCondition segment =
    case segment of
        Word _ string ->
            stringCondition string

        _ ->
            False


getOffset : Segment -> Int
getOffset segment =
    case segment of
        Word offset _ ->
            offset

        Whitespace offset _ ->
            offset

        Other offset _ ->
            offset


toString : Segment -> String
toString segment =
    case segment of
        Word _ string ->
            string

        Whitespace _ string ->
            string

        Other _ string ->
            string
