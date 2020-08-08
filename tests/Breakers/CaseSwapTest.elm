module Breakers.CaseSwapTest exposing (..)

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
    describe "CaseSwap"
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
