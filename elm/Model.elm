module Model exposing
    ( CliOptions
    , Command(..)
    , Flags
    , Model
    , Phase(..)
    , breakInit
    , filePathStringFromCommand
    , hintInit
    )

import Cli.Program as Program
import SavedData.Model exposing (SavedData, SavedDataError)
import Utils.Types.FilePath as FilePath exposing (FilePath)
import Utils.Types.LoggingStatus as LoggingStatus exposing (LoggingStatus)


type alias CliOptions =
    { command : Command
    , loggingStatus : LoggingStatus
    }


type alias Model =
    { randomNumber : Int
    , dataFilePath : FilePath
    , savedDataResult : Result SavedDataError SavedData
    , command : Command
    }


type Phase
    = ReadingFile
    | WritingFile


type Command
    = Break FilePath Phase
    | Hint FilePath Phase


type alias Flags =
    Program.FlagsIncludingArgv
        { randomNumber : Int
        , dataFilePath : String
        , data : Maybe String
        }


breakInit : String -> Bool -> CliOptions
breakInit filepathString loggingIsOn =
    { command = Break (FilePath.fromString filepathString) ReadingFile
    , loggingStatus = LoggingStatus.fromBool loggingIsOn
    }


hintInit : String -> Bool -> CliOptions
hintInit filepathString loggingIsOn =
    { command = Hint (FilePath.fromString filepathString) ReadingFile
    , loggingStatus = LoggingStatus.fromBool loggingIsOn
    }


filePathStringFromCommand : Command -> String
filePathStringFromCommand command =
    case command of
        Break filepath _ ->
            FilePath.toString filepath

        Hint filepath _ ->
            FilePath.toString filepath
