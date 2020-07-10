module Parsers.Generic.Parser exposing (run)

import Parser exposing (..)
import Parsers.Generic.Segment exposing (FunctionDeclarationData, Segment, SegmentType(..))
import Parsers.Utils.Repeat as Repeat
import Parsers.Utils.Whitespace as Whitespace


run : String -> Result (List DeadEnd) (List Segment)
run string =
    Parser.run segments string


segments : Parser (List Segment)
segments =
    Repeat.oneOrMore segment


segment : Parser Segment
segment =
    getOffset
        |> andThen
            (\offset ->
                oneOf
                    [ returnStatement
                        |> getChompedString
                        |> Parser.map (\content -> Segment offset content ReturnStatement)
                    , functionDeclarationWithContent
                        |> Parser.map
                            (\( content, data ) ->
                                Segment offset
                                    content
                                    (FunctionDeclaration data)
                            )
                    , word
                        |> getChompedString
                        |> Parser.map (\content -> Segment offset content Word)
                    , Whitespace.oneOrMore
                        |> getChompedString
                        |> Parser.map (\content -> Segment offset content Whitespace)
                    , Repeat.oneOrMore otherCharacter
                        |> getChompedString
                        |> Parser.map (\content -> Segment offset content Other)
                    ]
            )


returnStatement : Parser ()
returnStatement =
    succeed ()
        |. (backtrackable <|
                succeed ()
                    |. Whitespace.oneOrMore
                    |. token "return"
           )
        |. Whitespace.one


functionDeclarationWithContent : Parser ( String, FunctionDeclarationData )
functionDeclarationWithContent =
    getChompedString functionDeclaration
        |> andThen
            (\string ->
                case Parser.run functionDeclaration string of
                    Ok validFunctionDeclaration ->
                        succeed ( string, validFunctionDeclaration )

                    Err _ ->
                        Parser.problem
                            ("Script error: parsed function declaration successfully once "
                                ++ "and then failed just after with the same content???"
                            )
            )


functionDeclaration : Parser FunctionDeclarationData
functionDeclaration =
    backtrackable <|
        succeed FunctionDeclarationData
            |= getChompedString Whitespace.oneOrMore
            |= (getChompedString <| oneOf [ token "function ", token "def " ])
            |= (getChompedString <| word)
            |. token "("
            |= Repeat.zeroOrMoreWithSeparator
                Repeat.commaSeparator
                word
            |. token ")"


word : Parser String
word =
    getChompedString <| Repeat.oneOrMore wordCharacter


wordCharacter : Parser ()
wordCharacter =
    chompIf isWordCharacter


isWordCharacter : Char -> Bool
isWordCharacter char =
    Char.isAlphaNum char || List.member char [ '_', '-' ]


otherCharacter : Parser ()
otherCharacter =
    chompIf isOtherCharacter


isOtherCharacter : Char -> Bool
isOtherCharacter char =
    not (isWordCharacter char) && not (Whitespace.isValidWhiteSpace char)
