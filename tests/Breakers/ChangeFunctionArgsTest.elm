module Breakers.ChangeFunctionArgsTest exposing (..)

import Fuzz exposing (int, list)
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
            [ fuzz (list int) "one argument" <|
                \randomNumbers ->
                    expectBreakResultWithExt
                        { extension = "py"
                        , input = " def name(arg1):"
                        , output = " def name():"
                        , randomNumbers = randomNumbers
                        }
            , fuzz (list int) "two arguments" <|
                \randomNumbers ->
                    expectBreakResultWithExt
                        { extension = "py"
                        , input = " def name(arg1, arg2):"
                        , output = " def name(arg2, arg1):"
                        , randomNumbers = randomNumbers
                        }
            ]
        , describe "javascript"
            [ fuzz (list int) "one argument standard function syntax" <|
                \randomNumbers ->
                    expectBreakResultWithExt
                        { extension = "js"
                        , input = " function name(arg1){"
                        , output = " function name(){"
                        , randomNumbers = randomNumbers
                        }
            , fuzz (list int) "two arguments standard function syntax" <|
                \randomNumbers ->
                    expectBreakResultWithExt
                        { extension = "js"
                        , input = " function name(arg1, arg2){"
                        , output = " function name(arg2, arg1){"
                        , randomNumbers = randomNumbers
                        }
            , fuzz (list int) "one argument fat arrow function syntax" <|
                \randomNumbers ->
                    expectBreakResultWithExt
                        { extension = "js"
                        , input = "const name = (arg1) => "
                        , output = "const name = () => "
                        , randomNumbers = randomNumbers
                        }
            , fuzz (list int) "two arguments fat arrow function syntax" <|
                \randomNumbers ->
                    expectBreakResultWithExt
                        { extension = "js"
                        , input = "const name = (arg1, arg2) => "
                        , output = "const name = (arg2, arg1) => "
                        , randomNumbers = randomNumbers
                        }
            ]
        , describe "ruby"
            [ fuzz (list int) "one argument" <|
                \randomNumbers ->
                    expectBreakResultWithExt
                        { extension = "rb"
                        , input = "def name(arg1)"
                        , output = "def name()"
                        , randomNumbers = randomNumbers
                        }
            , fuzz (list int) "two arguments" <|
                \randomNumbers ->
                    expectBreakResultWithExt
                        { extension = "rb"
                        , input = "def name(arg1, arg2)"
                        , output = "def name(arg2, arg1)"
                        , randomNumbers = randomNumbers
                        }
            , describe "elm"
                [ fuzz (list int) "one argument" <|
                    \randomNumbers ->
                        expectBreakResultWithExt
                            { extension = "elm"
                            , input = "name arg1 ="
                            , output = "name ="
                            , randomNumbers = randomNumbers
                            }
                , fuzz (list int) "two arguments" <|
                    \randomNumbers ->
                        expectBreakResultWithExt
                            { extension = "elm"
                            , input = "name arg1 arg2 ="
                            , output = "name arg2 arg1 ="
                            , randomNumbers = randomNumbers
                            }
                ]
            ]
        ]
