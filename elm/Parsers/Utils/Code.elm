module Parsers.Utils.Code exposing
    ( otherCharacter
    , parenthesisOrBracket
    , returnStatement
    , word
    , string
    )

import Parser exposing (..)
import Parsers.Utils.Repeat as Repeat
import Parsers.Utils.Whitespace as Whitespace


returnStatement : Parser ()
returnStatement =
    backtrackable <|
        succeed ()
            |. token "return"
            |. Whitespace.one


parenthesisOrBracket : Parser ()
parenthesisOrBracket =
    oneOf
        [ token "{"
        , token "}"
        , token "("
        , token ")"
        , token "["
        , token "]"
        ]


word : Parser String
word =
    getChompedString <| Repeat.oneOrMore wordCharacter


wordCharacter : Parser ()
wordCharacter =
    chompIf isWordCharacter


isWordCharacter : Char -> Bool
isWordCharacter char =
    Char.isAlphaNum char || List.member char [ '_' ]


otherCharacter : Parser ()
otherCharacter =
    chompIf isOtherCharacter


isOtherCharacter : Char -> Bool
isOtherCharacter char =
    not (isWordCharacter char) && not (Whitespace.isValidWhiteSpace char)


string : Parser ()
string =
    oneOf
        [ doubleQuoteString
        , singleQuoteString
        ]


doubleQuoteString : Parser ()
doubleQuoteString =
    succeed ()
        |. token "\""
        |. Repeat.zeroOrMore
            (oneOf
                [ token "\\\""
                , chompIf (\char -> char /= '"')
                ]
            )
        |. token "\""


singleQuoteString : Parser ()
singleQuoteString =
    succeed ()
        |. token "'"
        |. Repeat.zeroOrMore (chompIf (\char -> char /= '\''))
        |. token "'"
