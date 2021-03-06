module Utils.Cmd exposing (exitIfAllSavesAreComplete, fromFileData, printAndExitIfAllSavesAreComplete)

import Actions exposing (Action)
import Model exposing (Command(..), FileSaveStatus, Model)
import Model.SavedData as SavedData exposing (SavedData, SavedDataError(..))
import Ports
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FileData exposing (FileData)
import Utils.Types.FilePath exposing (FilePath)


exitIfAllSavesAreComplete : FileSaveStatus -> Cmd action
exitIfAllSavesAreComplete fileSaveStatus =
    if Model.allSavesComplete fileSaveStatus then
        Ports.exitSuccess ()

    else
        Cmd.none


printAndExitIfAllSavesAreComplete : String -> FileSaveStatus -> Cmd action
printAndExitIfAllSavesAreComplete text fileSaveStatus =
    if Model.allSavesComplete fileSaveStatus then
        Ports.printAndExitSuccess text

    else
        Cmd.none


fromFileData :
    { filepath : FilePath
    , model : Model
    , dataPresentCmdFunc : SavedData -> FileData -> Cmd Action
    , dataAbsentCmd : Cmd Action
    }
    -> Cmd Action
fromFileData { filepath, model, dataPresentCmdFunc, dataAbsentCmd } =
    case model.savedDataResult of
        Ok savedData ->
            case
                SavedData.getFileData
                    { filepath = filepath
                    , workingDirectory = model.workingDirectory
                    }
                    savedData
            of
                Just fileData ->
                    dataPresentCmdFunc savedData fileData

                Nothing ->
                    dataAbsentCmd

        Err FileMissing ->
            dataAbsentCmd

        Err error ->
            error
                |> SavedData.errorMessage model.dataFilePath
                |> Ports.printAndExitFailure
