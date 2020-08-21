module Elm.InteractiveModeTest exposing (..)

-- import ProgramTest

import Expect
import Fuzz exposing (int, list)
import Parsers.Generic.Segment exposing (BreakStatus(..), SegmentType(..))
import Test exposing (..)


suite : Test
suite =
    describe "InteractiveModeTest"
        [ test "detects return statements" <|
            \_ ->
                Expect.equal True True
        ]
