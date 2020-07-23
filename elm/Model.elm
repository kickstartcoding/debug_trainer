module Model exposing
    ( CliOptions
    , Command(..)
    , Flags
    , Model
    , breakInit
    , hintInit
    , resetInit
    )

import Cli.Program as Program
import Model.SavedData exposing (SavedData, SavedDataError)
import Utils.Types.FilePath as FilePath exposing (FilePath)
import Utils.Types.LoggingStatus as LoggingStatus exposing (LoggingStatus)


type alias CliOptions =
    { command : Command
    , loggingStatus : LoggingStatus
    , isInTestMode : Bool
    }


type alias Model =
    { randomNumbers :
        { breakTypeInt : Int
        , segmentToBreakInt : Int
        }
    , dataFilePath : FilePath
    , workingDirectory : String
    , savedDataResult : Result SavedDataError SavedData
    , command : Command
    }


type Command
    = Break FilePath
    | Hint FilePath Int
    | Reset FilePath


type alias Flags =
    Program.FlagsIncludingArgv
        { randomNumber1 : Int
        , randomNumber2 : Int
        , workingDirectory : String
        , dataFilePath : String
        , data : Maybe String
        }


breakInit : String -> Bool -> Bool -> CliOptions
breakInit filepathString loggingIsOn isInTestMode =
    { command = Break (FilePath.fromString filepathString)
    , loggingStatus = LoggingStatus.fromBool loggingIsOn
    , isInTestMode = isInTestMode
    }


hintInit : Maybe String -> String -> Bool -> Bool -> CliOptions
hintInit maybeHintNumberString filepathString loggingIsOn isInTestMode =
    let
        hintNumber =
            case maybeHintNumberString of
                Just hintNumberString ->
                    hintNumberString
                        |> String.toInt
                        |> Maybe.withDefault 1

                Nothing ->
                    1

        filepath =
            FilePath.fromString filepathString

        loggingStatus =
            LoggingStatus.fromBool loggingIsOn
    in
    { command = Hint filepath hintNumber
    , loggingStatus = loggingStatus
    , isInTestMode = isInTestMode
    }


resetInit : String -> Bool -> Bool -> CliOptions
resetInit filepathString loggingIsOn isInTestMode =
    { command = Reset (FilePath.fromString filepathString)
    , loggingStatus = LoggingStatus.fromBool loggingIsOn
    , isInTestMode = isInTestMode
    }
