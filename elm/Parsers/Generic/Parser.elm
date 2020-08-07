module Parsers.Generic.Parser exposing (run)

import Parser exposing (..)
import Parsers.Generic.Segment exposing (BreakStatus(..), Segment, SegmentType(..))
import Parsers.JavaScript as JavaScript
import Parsers.Python as Python
import Parsers.Ruby as Ruby
import Parsers.UnknownLanguage as UnknownLanguage
import Parsers.Utils
import Parsers.Utils.Code as Code
import Parsers.Utils.Repeat as Repeat
import Parsers.Utils.Whitespace as Whitespace
import Utils.Types.FileType exposing (FileType(..))


run : FileType -> String -> Result (List DeadEnd) (List Segment)
run fileType string =
    Parser.run (segments fileType) string


segments : FileType -> Parser (List Segment)
segments fileType =
    Repeat.oneOrMore (segment fileType)


segment : FileType -> Parser Segment
segment fileType =
    getOffset
        |> andThen
            (\offset ->
                oneOf
                    ((case fileType of
                        JavaScript ->
                            [ JavaScript.comment
                                |> mapStringToSegment offset Comment
                            , JavaScript.blockComment
                                |> mapStringToSegment offset Comment
                            , Parsers.Utils.stringAndResult JavaScript.functionDeclaration
                                |> Parser.map
                                    (\( content, data ) ->
                                        Segment offset
                                            content
                                            (FunctionDeclaration data BreakNotAppliedYet)
                                    )
                            ]

                        Python ->
                            [ Python.comment
                                |> mapStringToSegment offset Comment
                            , Python.blockComment
                                |> mapStringToSegment offset Comment
                            , Parsers.Utils.stringAndResult Python.functionDeclaration
                                |> Parser.map
                                    (\( content, data ) ->
                                        Segment offset
                                            content
                                            (FunctionDeclaration data BreakNotAppliedYet)
                                    )
                            ]

                        Ruby ->
                            [ Ruby.comment
                                |> mapStringToSegment offset Comment
                            , Ruby.blockComment
                                |> mapStringToSegment offset Comment
                            , Parsers.Utils.stringAndResult Ruby.functionDeclaration
                                |> Parser.map
                                    (\( content, data ) ->
                                        Segment offset
                                            content
                                            (FunctionDeclaration data BreakNotAppliedYet)
                                    )
                            ]

                        Unknown ->
                            [ Parsers.Utils.stringAndResult UnknownLanguage.functionDeclaration
                                |> Parser.map
                                    (\( content, data ) ->
                                        Segment offset
                                            content
                                            (FunctionDeclaration data BreakNotAppliedYet)
                                    )
                            ]
                     )
                        ++ [ Code.returnStatement
                                |> mapStringToSegment offset (ReturnStatement BreakNotAppliedYet)
                           , parenthesisOrBracketAtStartOrEndOfLine
                                |> mapStringToSegment offset (ParenthesisOrBracket BreakNotAppliedYet)
                           , dotAccess
                                |> mapStringToSegment offset (DotAccess BreakNotAppliedYet)
                           , Code.word
                                |> mapStringToSegment offset (Word BreakNotAppliedYet)
                           , Repeat.oneOrMore (chompIf Whitespace.isNonNewlineWhiteSpace)
                                |> mapStringToSegment offset Whitespace
                           , chompIf (\char -> char == '\n')
                                |> mapStringToSegment offset Whitespace
                           , Repeat.oneOrMore Code.otherCharacter
                                |> mapStringToSegment offset Other
                           ]
                    )
            )


mapStringToSegment : Int -> SegmentType -> Parser data -> Parser Segment
mapStringToSegment offset segmentType parser =
    parser
        |> getChompedString
        |> Parser.map (\content -> Segment offset content segmentType)


dotAccess : Parser ()
dotAccess =
    succeed ()
        |. (backtrackable <|
                succeed ()
                    |. Code.word
                    |. Repeat.oneOrMore
                        (succeed ()
                            |. token "."
                            |. Code.word
                        )
           )


parenthesisOrBracketAtStartOrEndOfLine : Parser ()
parenthesisOrBracketAtStartOrEndOfLine =
    succeed ()
        |. oneOf
            [ backtrackable <|
                succeed ()
                    |. token "\n"
                    |. Repeat.zeroOrMore (token " ")
                    |. Code.parenthesisOrBracket
                    |. Repeat.zeroOrMore (token " ")
            , backtrackable <|
                succeed ()
                    |. Repeat.zeroOrMore (token " ")
                    |. Code.parenthesisOrBracket
                    |. Repeat.zeroOrMore (token " ")
                    |. token "\n"
            ]
