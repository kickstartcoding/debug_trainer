module Parsers.Generic.Segment exposing
    ( Segment
    , SegmentType(..)
    , isOther
    , isReturnStatement
    , isWhitespace
    , isWord
    )


type SegmentType
    = Word
    | ReturnStatement
    | Whitespace
    | Other


type alias Segment =
    { offset : Int
    , content : String
    , segmentType : SegmentType
    }


isWord : Segment -> Bool
isWord segment =
    case segment.segmentType of
        Word ->
            True

        _ ->
            False


isReturnStatement : Segment -> Bool
isReturnStatement segment =
    case segment.segmentType of
        ReturnStatement ->
            True

        _ ->
            False


isWhitespace : Segment -> Bool
isWhitespace segment =
    case segment.segmentType of
        Whitespace ->
            True

        _ ->
            False


isOther : Segment -> Bool
isOther segment =
    case segment.segmentType of
        Other ->
            True

        _ ->
            False
