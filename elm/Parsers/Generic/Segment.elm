module Parsers.Generic.Segment exposing
    ( FunctionDeclarationData
    , Segment
    , SegmentType(..)
    , functionDeclarationDataToString
    , isFunctionDeclaration
    , isOther
    , isReturnStatement
    , isWhitespace
    , isWord
    )


type SegmentType
    = Word
    | ReturnStatement
    | FunctionDeclaration FunctionDeclarationData
    | Whitespace
    | Other


type alias FunctionDeclarationData =
    { precedingWhitespace : String
    , declarationWord : String
    , name : String
    , arguments : List String
    }


functionDeclarationDataToString : FunctionDeclarationData -> String
functionDeclarationDataToString { precedingWhitespace, declarationWord, name, arguments } =
    precedingWhitespace ++ declarationWord ++ name ++ "(" ++ String.join ", " arguments ++ ")"


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


isFunctionDeclaration : Segment -> Bool
isFunctionDeclaration segment =
    case segment.segmentType of
        FunctionDeclaration _ ->
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
