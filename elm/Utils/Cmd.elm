module Utils.Cmd exposing (fromFileData)

import Actions exposing (Action)
import Model exposing (Command(..), Model)
import Model.SavedData as SavedData exposing (FileData, SavedData, SavedDataError(..))
import Ports
import Utils.Messages as Messages
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath exposing (FilePath)


fromFileData : FilePath -> Model -> (SavedData -> FileData -> Cmd Action) -> Cmd Action
fromFileData filepath { savedDataResult, dataFilePath, workingDirectory } fileDataFunc =
    case savedDataResult of
        Ok savedData ->
            case
                SavedData.getFileData
                    { filepath = filepath
                    , workingDirectory = workingDirectory
                    }
                    savedData
            of
                Just fileData ->
                    fileDataFunc savedData fileData

                Nothing ->
                    Ports.printAndExitSuccess
                        (Messages.noRecordOfChangeMessage filepath)

        Err FileMissing ->
            Ports.printAndExitSuccess
                (Messages.noRecordOfChangeMessage filepath)

        Err error ->
            error
                |> SavedData.errorMessage dataFilePath
                |> Ports.printAndExitFailure
