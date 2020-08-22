port module Ports exposing
    ( askUserForANumber
    , askUserMultipleChoice
    , chooseRandomFile
    , exitSuccess
    , finishedPrinting
    , print
    , printAndExitFailure
    , printAndExitSuccess
    , printAndReturn
    , readFile
    , receiveFileChoice
    , receiveUserAnswer
    , receiveUserNumberChoice
    , successfulFileRead
    , successfulFileWrite
    , writeFile
    )


port askUserMultipleChoice : { name : String, message : String, options : List String } -> Cmd action


port askUserForANumber : { name : String, message : String, min : Int, max : Int } -> Cmd action


port receiveUserNumberChoice : (Int -> action) -> Sub action


port chooseRandomFile : () -> Cmd action


port print : String -> Cmd action


port readFile : String -> Cmd action


port writeFile : { path : String, content : String } -> Cmd action


port receiveFileChoice : (String -> action) -> Sub action


port successfulFileWrite : ({ path : String, content : String } -> action) -> Sub action


port successfulFileRead : ({ path : String, content : String } -> action) -> Sub action


port receiveUserAnswer : (String -> action) -> Sub action


port finishedPrinting : (String -> action) -> Sub action


port printAndExitFailure : String -> Cmd action


port printAndExitSuccess : String -> Cmd action


port printAndReturn : String -> Cmd action


port exitSuccess : () -> Cmd action
