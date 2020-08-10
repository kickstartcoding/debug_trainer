module Elm.Breakers.RemoveReturnTest exposing (..)

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
    describe "RemoveReturn"
        [ fuzz (list int) "return removal" <|
            \randomNumbers ->
                expectBreakResult
                    { input = "return "
                    , output = ""
                    , randomNumbers = randomNumbers
                    }
        ]
