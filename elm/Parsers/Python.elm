module Parsers.Python exposing (..)
import Parser exposing (..)

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
comment : Parser ()
comment =
  lineComment "#"

blockComment : Parser ()
blockComment =
  multiComment "'''" "'''" NotNestable
