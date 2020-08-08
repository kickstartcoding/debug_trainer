module Breakers.RemoveDotAccessTest exposing (..)

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
    describe "RemoveDotAccess"
        [ test "dot-access removal" <|
            \_ ->
                expectBreakToOutputOneOf
                    { input = "thing1.thing2.thing3"
                    , outputPossibilities = [ "thing1.thing2", "thing1.thing3", "thing2.thing3" ]
                    }
        ]
