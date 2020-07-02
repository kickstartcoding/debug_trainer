module Parsers.Generic.Parser exposing (run)

import Parser exposing (..)
import Parsers.Generic.Segment exposing (Segment(..))
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
                    [ Repeat.oneOrMore wordCharacter
                        |> getChompedString
                        |> Parser.map (Word offset)
                    , Whitespace.oneOrMore
                        |> getChompedString
                        |> Parser.map (Whitespace offset)
                    , Repeat.oneOrMore otherCharacter
                        |> getChompedString
                        |> Parser.map (Other offset)
                    ]
            )


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
