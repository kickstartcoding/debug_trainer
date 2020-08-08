module Breakers.RemoveReturnTest exposing (..)

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
    describe "RemoveReturn"
        [ test "return removal" <|
            \_ ->
                expectBreakResult
                    { input = "return "
                    , output = ""
                    }
        ]
