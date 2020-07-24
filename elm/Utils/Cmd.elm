module Utils.Cmd exposing (fromFileData)

import Actions exposing (Action)
import Model exposing (Command(..), Model)
import Model.SavedData as SavedData exposing (FileData, SavedData, SavedDataError(..))
import Ports
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath exposing (FilePath)


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
