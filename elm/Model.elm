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
    | Hint FilePath
    | Reset FilePath


type alias Flags =
    Program.FlagsIncludingArgv
        { randomNumber1 : Int
        , randomNumber2 : Int
        , workingDirectory : String
        , dataFilePath : String
        , data : Maybe String
        }


breakInit : String -> Bool -> CliOptions
breakInit filepathString loggingIsOn =
    { command = Break (FilePath.fromString filepathString)
    , loggingStatus = LoggingStatus.fromBool loggingIsOn
    }


hintInit : String -> Bool -> CliOptions
hintInit filepathString loggingIsOn =
    { command = Hint (FilePath.fromString filepathString)
    , loggingStatus = LoggingStatus.fromBool loggingIsOn
    }


resetInit : String -> Bool -> CliOptions
resetInit filepathString loggingIsOn =
    { command = Reset (FilePath.fromString filepathString)
    , loggingStatus = LoggingStatus.fromBool loggingIsOn
    }


filePathStringFromCommand : Command -> String
filePathStringFromCommand command =
    case command of
        Break filepath ->
            FilePath.toString filepath

        Hint filepath ->
            FilePath.toString filepath

        Reset filepath ->
            FilePath.toString filepath
