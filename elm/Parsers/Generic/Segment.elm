module Parsers.Generic.Segment exposing
    ( BreakStatus(..)
    , FunctionDeclarationData
    , Segment
    , SegmentType(..)
    , functionDeclarationDataToString
    )


type SegmentType
    = Word BreakStatus
    | ReturnStatement BreakStatus
    | ParenthesisOrBracket BreakStatus
    | FunctionDeclaration FunctionDeclarationData BreakStatus
    | Whitespace
    | Other


type BreakStatus
    = BreakHasBeenApplied
    | BreakNotAppliedYet


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
