module Parsers.Generic.Segment exposing
    ( FunctionDeclarationData
    , Segment
    , SegmentType(..)
    , functionDeclarationDataToString
    )


type SegmentType
    = Word
    | ReturnStatement
    | ParenthesisOrBracket
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
