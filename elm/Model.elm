module Model exposing
    ( CliOptions
    , Command(..)
    , Flags
    , Model
    , breakInit
    , filePathStringFromCommand
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
                    String.toInt hintNumberString
                        |> Maybe.withDefault 1

                Nothing ->
                    1
    in
    { command = Hint (FilePath.fromString filepathString) hintNumber
    , loggingStatus = LoggingStatus.fromBool loggingIsOn
    , isInTestMode = isInTestMode
    }


resetInit : String -> Bool -> Bool -> CliOptions
resetInit filepathString loggingIsOn isInTestMode =
    { command = Reset (FilePath.fromString filepathString)
    , loggingStatus = LoggingStatus.fromBool loggingIsOn
    , isInTestMode = isInTestMode
    }


filePathStringFromCommand : Command -> String
filePathStringFromCommand command =
    case command of
        Break filepath ->
            FilePath.toString filepath

        Hint filepath _ ->
            FilePath.toString filepath

        Reset filepath ->
            FilePath.toString filepath
