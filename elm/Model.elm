module Model exposing
    ( BreakData
    , CliOptions
    , Command(..)
    , FileSaveStatus
    , Flags
    , HintType(..)
    , Model
    , allSavesComplete
    , breakInit
    , explainInit
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
    { randomNumbers : List Int
    , dataFilePath : FilePath
    , workingDirectory : String
    , savedDataResult : Result SavedDataError SavedData
    , command : Command
    }


type Command
    = Break BreakData
    | Hint FilePath HintType
    | Explain FilePath
    | Reset FilePath FileSaveStatus


type alias BreakData =
    { breakCount : Int
    , filepath : FilePath
    , fileSaveStatus : FileSaveStatus
    }


type HintType
    = ErrorDescription
    | LineNumber


initFileSaveStatus : FileSaveStatus
initFileSaveStatus =
    { targetFileSaved = False, saveDataSaved = False }


allSavesComplete : FileSaveStatus -> Bool
allSavesComplete { targetFileSaved, saveDataSaved } =
    targetFileSaved && saveDataSaved


type alias FileSaveStatus =
    { targetFileSaved : Bool
    , saveDataSaved : Bool
    }


type alias Flags =
    Program.FlagsIncludingArgv
        { randomNumbers : List Int
        , workingDirectory : String
        , dataFilePath : String
        , data : Maybe String
        }


breakInit : Maybe String -> String -> Bool -> Bool -> CliOptions
breakInit maybeBreakCountString filepathString loggingIsOn isInTestMode =
    let
        breakCount =
            case maybeBreakCountString of
                Just string ->
                    case String.toInt string of
                        Just count ->
                            -- Between one and ten breaks
                            min count 10
                                |> max 1

                        Nothing ->
                            1

                Nothing ->
                    1
    in
    { command =
        Break
            { breakCount = breakCount
            , filepath = FilePath.fromString filepathString
            , fileSaveStatus = initFileSaveStatus
            }
    , loggingStatus = LoggingStatus.fromBool loggingIsOn
    , isInTestMode = isInTestMode
    }


hintInit : HintType -> String -> Bool -> Bool -> CliOptions
hintInit hintType filepathString loggingIsOn isInTestMode =
    { command = Hint (FilePath.fromString filepathString) hintType
    , loggingStatus = LoggingStatus.fromBool loggingIsOn
    , isInTestMode = isInTestMode
    }


explainInit : String -> Bool -> Bool -> CliOptions
explainInit filepathString loggingIsOn isInTestMode =
    { command = Explain (FilePath.fromString filepathString)
    , loggingStatus = LoggingStatus.fromBool loggingIsOn
    , isInTestMode = isInTestMode
    }


resetInit : String -> Bool -> Bool -> CliOptions
resetInit filepathString loggingIsOn isInTestMode =
    { command = Reset (FilePath.fromString filepathString) initFileSaveStatus
    , loggingStatus = LoggingStatus.fromBool loggingIsOn
    , isInTestMode = isInTestMode
    }


filePathStringFromCommand : Command -> String
filePathStringFromCommand command =
    case command of
        Break { filepath } ->
            FilePath.toString filepath

        Hint filepath _ ->
            FilePath.toString filepath

        Explain filepath ->
            FilePath.toString filepath

        Reset filepath _ ->
            FilePath.toString filepath
