module Parsers.Generic exposing (Segment(..), run)

import Parser exposing (..)
import Parsers.Utils.Repeat as Repeat
import Parsers.Utils.Whitespace as Whitespace


type Segment
    = Word String
    | Whitespace String
    | Other String


run : String -> Result (List DeadEnd) (List Segment)
run string =
    Parser.run segments string


segments : Parser (List Segment)
segments =
    Repeat.oneOrMore segment


segment : Parser Segment
segment =
    oneOf
        [ Repeat.oneOrMore wordCharacter
            |> getChompedString
            |> Parser.map Word
        , Whitespace.oneOrMore
            |> getChompedString
            |> Parser.map Whitespace
        , Repeat.oneOrMore otherCharacter
            |> getChompedString
            |> Parser.map Other
        ]


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
