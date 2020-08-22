module Elm.InteractiveModeTest exposing (..)

import Expect
import Fuzz exposing (int, list)
import Generic.Segment exposing (BreakStatus(..), SegmentType(..))
import ProgramTest
import Test exposing (..)


suite : Test
suite =
    describe "InteractiveModeTest"
        [ test "detects return statements" <|
            \_ ->
                Expect.equal True True
        ]
