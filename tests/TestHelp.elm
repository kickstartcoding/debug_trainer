module TestHelp exposing (..)

import Expect
import Parser exposing (DeadEnd)


expectResult : (String -> Result (List DeadEnd) dataType) -> String -> dataType -> Expect.Expectation
expectResult parseFunc source expected =
    case parseFunc source of
        Err deadEnds ->
            let
                printedResult =
                    Debug.log "Unexpected result" deadEnds
            in
            Expect.fail "Expecting success but got Err."

        Ok validResult ->
            Expect.equal validResult expected
