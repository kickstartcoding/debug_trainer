module Elm.Breakers.RemoveParenthesisTest exposing (..)

import Elm.TestHelp as TestHelp
    exposing
        ( expectBreakResult
        , expectBreakResultWithExt
        , expectBreakToOutputOneOf
        , expectBreakWithExtToOutputOneOf
        )
import Fuzz exposing (int, list)
import Parsers.Generic.Segment exposing (BreakStatus(..), SegmentType(..))
import Test exposing (..)


suite : Test
suite =
    describe "RemoveParenthesis"
        (List.map
            (\parenString ->
                describe ("removing a " ++ parenString)
                    [ fuzz (list int) ("removes a " ++ parenString ++ " from the beginning of a line") <|
                        \randomNumbers ->
                            expectBreakResult
                                { input = "\n" ++ parenString
                                , output = "\n"
                                , randomNumbers = randomNumbers
                                }
                    , fuzz (list int) ("removes a " ++ parenString ++ " from the end of a line") <|
                        \randomNumbers ->
                            expectBreakResult
                                { input = parenString ++ "\n"
                                , output = "\n"
                                , randomNumbers = randomNumbers
                                }
                    ]
            )
            [ "(", ")", "{", "}", "[", "]" ]
        )
