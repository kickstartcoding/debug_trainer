port module Ports exposing
    ( exitSuccess
    , print
    , printAndExitFailure
    , printAndExitSuccess
    , readFile
    , successfulFileRead
    , successfulFileWrite
    , writeFile
    )


port print : String -> Cmd action


port readFile : String -> Cmd action


port writeFile : { path : String, content : String } -> Cmd action


port successfulFileWrite : ({ path : String, content : String } -> action) -> Sub action


port successfulFileRead : ({ path : String, content : String } -> action) -> Sub action


port printAndExitFailure : String -> Cmd action


port printAndExitSuccess : String -> Cmd action


port exitSuccess : () -> Cmd action
