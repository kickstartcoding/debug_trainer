port module Ports exposing
    ( print
    , printAndExitFailure
    , printAndExitSuccess
    , readFile
    , receiveFileContents
    , writeFile
    )

import Json.Encode


port print : String -> Cmd action


port readFile : String -> Cmd action


port writeFile : Json.Encode.Value -> Cmd action


port receiveFileContents : (String -> action) -> Sub action


port printAndExitFailure : String -> Cmd action


port printAndExitSuccess : String -> Cmd action
