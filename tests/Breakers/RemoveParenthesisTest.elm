module Breakers.RemoveParenthesisTest exposing (..)

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
    describe "RemoveParenthesis"
        (List.map
            (\parenString ->
                describe ("removing a " ++ parenString)
                    [ test ("removes a " ++ parenString ++ " from the beginning of a line") <|
                        \_ ->
                            expectBreakResult
                                { input = "\n" ++ parenString
                                , output = "\n"
                                }
                    , test ("removes a " ++ parenString ++ " from the end of a line") <|
                        \_ ->
                            expectBreakResult
                                { input = parenString ++ "\n"
                                , output = "\n"
                                }
                    ]
            )
            [ "(", ")", "{", "}", "[", "]" ]
        )
