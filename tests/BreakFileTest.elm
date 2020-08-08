module BreakFileTest exposing (..)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Parsers.Generic.Segment exposing (BreakStatus(..), SegmentType(..))
import Test exposing (..)
import TestHelp
    exposing
        ( expectBreakResult
        , expectBreakResultWithExt
        , expectBreakToOutputOneOf
        , expectBreakWithExtToOutputOneOf
        )


suite : Test
suite =
    describe "Breakers"
        [ describe "CaseSwap"
            [ test "capitalizes" <|
                \_ ->
                    expectBreakResult
                        { input = "word"
                        , output = "Word"
                        }
            , test "lowercases" <|
                \_ ->
                    expectBreakResult
                        { input = "Word"
                        , output = "word"
                        }
            ]
        , describe "ChangeFunctionArgs"
            [ describe "python"
                [ test "one argument" <|
                    \_ ->
                        expectBreakResultWithExt
                            { extension = "py"
                            , input = " def name(arg1):"
                            , output = " def name():"
                            }
                , test "two arguments" <|
                    \_ ->
                        expectBreakResultWithExt
                            { extension = "py"
                            , input = " def name(arg1, arg2):"
                            , output = " def name(arg2, arg1):"
                            }
                ]
            , describe "javascript"
                [ test "one argument" <|
                    \_ ->
                        expectBreakResultWithExt
                            { extension = "js"
                            , input = " function name(arg1){"
                            , output = " function name(){"
                            }
                , test "two arguments" <|
                    \_ ->
                        expectBreakResultWithExt
                            { extension = "js"
                            , input = " function name(arg1, arg2){"
                            , output = " function name(arg2, arg1){"
                            }
                ]
            , describe "ruby"
                [ test "one argument" <|
                    \_ ->
                        expectBreakResultWithExt
                            { extension = "rb"
                            , input = "def name(arg1)"
                            , output = "def name()"
                            }
                , test "two arguments" <|
                    \_ ->
                        expectBreakResultWithExt
                            { extension = "rb"
                            , input = "def name(arg1, arg2)"
                            , output = "def name(arg2, arg1)"
                            }
                , describe "elm"
                    [ test "one argument" <|
                        \_ ->
                            expectBreakResultWithExt
                                { extension = "elm"
                                , input = "name arg1 ="
                                , output = "name ="
                                }
                    , test "two arguments" <|
                        \_ ->
                            expectBreakResultWithExt
                                { extension = "elm"
                                , input = "name arg1 arg2 ="
                                , output = "name arg2 arg1 ="
                                }
                    ]
                ]
            ]
        , describe "RemoveDotAccess"
            [ test "dot-access removal" <|
                \_ ->
                    expectBreakToOutputOneOf
                        { input = "thing1.thing2.thing3"
                        , outputPossibilities = [ "thing1.thing2", "thing1.thing3", "thing2.thing3" ]
                        }
            ]
        , describe "comment ignoring functionality"
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
        ]
