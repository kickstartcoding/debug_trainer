module Elm.Breakers.RemoveDotAccessTest exposing (..)

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
    describe "RemoveDotAccess"
        [ fuzz (list int) "dot-access removal" <|
            \randomNumbers ->
                expectBreakToOutputOneOf
                    { input = "thing1.thing2.thing3"
                    , outputPossibilities = [ "thing1.thing2", "thing1.thing3", "thing2.thing3" ]
                    , randomNumbers = randomNumbers
                    }
        ]
