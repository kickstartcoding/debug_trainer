module BreakFileTest exposing (..)

import Parsers.Generic.Segment exposing (BreakStatus(..), SegmentType(..))
import Test exposing (..)
import TestHelp
    exposing
        ( expectBreakResult
        , expectBreakResultWithExt
        , expectBreakToOutputOneOf
        , expectBreakWithExtToOutputOneOf
        , expectMultiBreakResult
        , expectMultiBreakToOutputOneOf
        )


suite : Test
suite =
    describe "BreakFile"
        [ describe "comment ignoring functionality"
            [ describe "javascript"
                [ test "does not break words in js comments" <|
                    \_ ->
                        expectBreakResultWithExt
                            { extension = "js"
                            , input = "// comment"
                            , output = "// comment"
                            }
                , test "breaks words in python comments" <|
                    \_ ->
                        expectBreakResultWithExt
                            { extension = "js"
                            , input = "# word"
                            , output = "# Word"
                            }
                ]
            , describe "python"
                [ test "does not break words in python comments" <|
                    \_ ->
                        expectBreakResultWithExt
                            { extension = "py"
                            , input = "# comment"
                            , output = "# comment"
                            }
                , test "breaks words in js comments" <|
                    \_ ->
                        expectBreakResultWithExt
                            { extension = "py"
                            , input = "// word"
                            , output = "// Word"
                            }
                ]
            ]
        , describe "string ignoring functionality"
            [ test "ignores double-quoted strings" <|
                \_ ->
                    expectBreakResult
                        { input = "\"word word word\""
                        , output = "\"word word word\""
                        }
            , test "ignores single-quoted strings" <|
                \_ ->
                    expectBreakResult
                        { input = "'word word word'"
                        , output = "'word word word'"
                        }
            ]
        , describe "multi-breaking"
            [ test "causes specified number of errors" <|
                \_ ->
                    expectMultiBreakToOutputOneOf
                        { input = "hey ho hi"
                        , outputPossibilities = [ "hey Ho Hi", "Hey ho Hi", "Hey Ho hi" ]
                        , breakCount = 2
                        }
            , test "gives up on more errors if no possible errors left" <|
                \_ ->
                    expectMultiBreakResult
                        { input = "hey ho hi"
                        , output = "Hey Ho Hi"
                        , breakCount = 9999
                        }
            ]
        ]
