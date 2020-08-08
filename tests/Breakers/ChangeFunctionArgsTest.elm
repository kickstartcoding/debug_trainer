module Breakers.ChangeFunctionArgsTest exposing (..)

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
    describe "ChangeFunctionArgs"
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
            [ test "one argument standard function syntax" <|
                \_ ->
                    expectBreakResultWithExt
                        { extension = "js"
                        , input = " function name(arg1){"
                        , output = " function name(){"
                        }
            , test "two arguments standard function syntax" <|
                \_ ->
                    expectBreakResultWithExt
                        { extension = "js"
                        , input = " function name(arg1, arg2){"
                        , output = " function name(arg2, arg1){"
                        }
            , test "one argument fat arrow function syntax" <|
                \_ ->
                    expectBreakResultWithExt
                        { extension = "js"
                        , input = "const name = (arg1) => "
                        , output = "const name = () => "
                        }
            , test "two arguments fat arrow function syntax" <|
                \_ ->
                    expectBreakResultWithExt
                        { extension = "js"
                        , input = "const name = (arg1, arg2) => "
                        , output = "const name = (arg2, arg1) => "
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
