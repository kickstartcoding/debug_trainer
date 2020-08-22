module Model exposing
    ( BreakData
    , CliOptions
    , Command(..)
    , FileSaveStatus
    , Flags
    , HintType(..)
    , InteractionPhase(..)
    , Model
    , allSavesComplete
    , breakInit
    , explainInit
    , hintInit
    , initFileSaveStatus
    , interactiveInit
    , resetInit
    )

import Cli.Program as Program
import Model.SavedData exposing (SavedData, SavedDataError)
import Utils.Types.FileData exposing (FileData)
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
    = Interactive InteractionPhase
    | Break BreakData
    | Hint FilePath HintType
    | Explain FilePath
    | Reset FilePath FileSaveStatus


type InteractionPhase
    = SelectingTargetFile Int
    | ReadingTargetFile FilePath
    | SelectingBreakCount
    | BreakingFile Int FileData
    | Solving FileData
    | Solved FilePath
    | ResettingAndExiting


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


interactiveInit : Maybe String -> List String -> CliOptions
interactiveInit maybeFilepathString _ =
    { command =
        case maybeFilepathString of
            Just filepathString ->
                Interactive (ReadingTargetFile (FilePath.fromString filepathString))

            Nothing ->
                Interactive SelectingTargetFile
    , loggingStatus = LoggingStatus.fromBool False
    , isInTestMode = False
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
