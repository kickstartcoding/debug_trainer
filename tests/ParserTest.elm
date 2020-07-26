module ParserTest exposing (..)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Parser exposing (DeadEnd)
import Parsers.Generic.Parser as GenericParser
import Parsers.Generic.Segment exposing (BreakStatus(..), SegmentType(..))
import Test exposing (..)
import TestHelp


suite : Test
suite =
    describe "Parsers.Generic.Parser.run"
        [ test "detects words" <|
            \_ ->
                TestHelp.expectResult GenericParser.run
                    "   abc^&*"
                    [ { content = "   ", offset = 0, segmentType = Whitespace }
                    , { content = "abc", offset = 3, segmentType = Word BreakNotAppliedYet }
                    , { content = "^&*", offset = 6, segmentType = Other }
                    ]
        , test "detects return statements" <|
            \_ ->
                TestHelp.expectResult GenericParser.run
                    " return "
                    [ { content = " return ", offset = 0, segmentType = ReturnStatement BreakNotAppliedYet }
                    ]
        , test "detects return statements with extra preceding whitespace" <|
            \_ ->
                TestHelp.expectResult GenericParser.run
                    "  return "
                    [ { content = "  return ", offset = 0, segmentType = ReturnStatement BreakNotAppliedYet }
                    ]
        , test "ignores the word return if no whitespace precedes it" <|
            \_ ->
                TestHelp.expectResult GenericParser.run
                    "return "
                    [ { content = "return", offset = 0, segmentType = Word BreakNotAppliedYet }
                    , { content = " ", offset = 6, segmentType = Whitespace }
                    ]
        , test "ignores the word return if no whitespace between it and the next word" <|
            \_ ->
                TestHelp.expectResult GenericParser.run
                    " return"
                    [ { content = " ", offset = 0, segmentType = Whitespace }
                    , { content = "return", offset = 1, segmentType = Word BreakNotAppliedYet }
                    ]
        , test "detects parentheses at the start of a line" <|
            \_ ->
                TestHelp.expectResult GenericParser.run
                    "\n ) abc"
                    [ { content = "\n ) ", offset = 0, segmentType = ParenthesisOrBracket BreakNotAppliedYet }
                    , { content = "abc", offset = 4, segmentType = Word BreakNotAppliedYet }
                    ]
        , test "detects parentheses at the end of a line" <|
            \_ ->
                TestHelp.expectResult GenericParser.run
                    "abc ) \n"
                    [ { content = "abc", offset = 0, segmentType = Word BreakNotAppliedYet }
                    , { content = " ) \n", offset = 3, segmentType = ParenthesisOrBracket BreakNotAppliedYet }
                    ]
        , test "detects functions" <|
            \_ ->
                TestHelp.expectResult GenericParser.run
                    " function hello(arg1, arg2)"
                    [ { content = " function hello(arg1, arg2)"
                      , offset = 0
                      , segmentType =
                            FunctionDeclaration
                                { precedingWhitespace = " "
                                , declarationWord = "function "
                                , name = "hello"
                                , arguments = [ "arg1", "arg2" ]
                                }
                                BreakNotAppliedYet
                      }
                    ]
        , test "detects brackets at the start of a line" <|
            \_ ->
                TestHelp.expectResult GenericParser.run
                    "\n{"
                    [ { content = "\n{", offset = 0, segmentType = ParenthesisOrBracket BreakNotAppliedYet } ]
        , test "detects brackets at the start of a line with multiple preceing newlines" <|
            \_ ->
                TestHelp.expectResult GenericParser.run
                    "\n\n\n{"
                    [ { content = "\n", offset = 0, segmentType = Whitespace }
                    , { content = "\n", offset = 1, segmentType = Whitespace }
                    , { content = "\n{", offset = 2, segmentType = ParenthesisOrBracket BreakNotAppliedYet }
                    ]
        , test "detects brackets at the end of a line" <|
            \_ ->
                TestHelp.expectResult GenericParser.run
                    "}\n"
                    [ { content = "}\n", offset = 0, segmentType = ParenthesisOrBracket BreakNotAppliedYet } ]
        ]
