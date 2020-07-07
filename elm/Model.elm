module Model exposing
    ( Command(..)
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


breakInit : String -> Command
breakInit filepathString =
    Break (FilePath.fromString filepathString) ReadingFile


hintInit : String -> Command
hintInit filepathString =
    Hint (FilePath.fromString filepathString) ReadingFile


filePathStringFromCommand : Command -> String
filePathStringFromCommand command =
    case command of
        Break filepath _ ->
            FilePath.toString filepath

        Hint filepath _ ->
            FilePath.toString filepath
