module Parsers.Utils.Whitespace exposing (isValidWhiteSpace, one, oneOrMore, optional)

import Parser exposing (..)


one : Parser ()
one =
    chompIf isValidWhiteSpace


oneOrMore : Parser ()
oneOrMore =
    succeed ()
        |. one
        |. optional


optional : Parser ()
optional =
    chompWhile isValidWhiteSpace


isValidWhiteSpace : Char -> Bool
isValidWhiteSpace char =
    char == ' ' || char == '\n' || char == '\u{000D}' || char == '\t'
