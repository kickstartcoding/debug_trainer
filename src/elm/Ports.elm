port module Ports exposing
    ( askUser
    , exitSuccess
    , finishedPrinting
    , print
    , printAndExitFailure
    , printAndExitSuccess
    , printAndReturn
    , readFile
    , receiveUserAnswer
    , successfulFileRead
    , successfulFileWrite
    , writeFile
    )


port askUser : { question : String, options : List String } -> Cmd action


port print : String -> Cmd action


port readFile : String -> Cmd action


port writeFile : { path : String, content : String } -> Cmd action


port successfulFileWrite : ({ path : String, content : String } -> action) -> Sub action


port successfulFileRead : ({ path : String, content : String } -> action) -> Sub action


port receiveUserAnswer : (String -> action) -> Sub action


port finishedPrinting : (String -> action) -> Sub action


port printAndExitFailure : String -> Cmd action


port printAndExitSuccess : String -> Cmd action


port printAndReturn : String -> Cmd action


port exitSuccess : () -> Cmd action
