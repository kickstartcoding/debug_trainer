module Example exposing (..)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Parser exposing (DeadEnd)
import Parsers.Generic.Parser as GenericParser
import Parsers.Generic.Segment exposing (Segment, SegmentType(..), isReturnStatement)
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
                    , { content = "abc", offset = 3, segmentType = Word }
                    , { content = "^&*", offset = 6, segmentType = Other }
                    ]
        , test "detects return statements" <|
            \_ ->
                TestHelp.expectResult GenericParser.run
                    " return "
                    [ { content = " return ", offset = 0, segmentType = ReturnStatement }
                    ]
        , test "detects return statements with extra preceding whitespace" <|
            \_ ->
                TestHelp.expectResult GenericParser.run
                    "  return "
                    [ { content = "  return ", offset = 0, segmentType = ReturnStatement }
                    ]
        , test "ignores the word return if no whitespace precedes it" <|
            \_ ->
                TestHelp.expectResult GenericParser.run
                    "return "
                    [ { content = "return", offset = 0, segmentType = Word }
                    , { content = " ", offset = 6, segmentType = Whitespace }
                    ]
        , test "ignores the word return if no whitespace between it and the next word" <|
            \_ ->
                TestHelp.expectResult GenericParser.run
                    " return"
                    [ { content = " ", offset = 0, segmentType = Whitespace }
                    , { content = "return", offset = 1, segmentType = Word }
                    ]
        ]
