module Commands.Reset.Cmd exposing (init)

import Actions exposing (Action)
import Model exposing (Command(..), FileSaveStatus, Model)
import Model.SavedData as SavedData exposing (SavedDataError(..))
import Ports
import Utils.Cmd as Cmd
import Utils.Messages as Messages
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


init : FilePath -> FileSaveStatus -> Model -> Cmd Action
init filepath fileSaveStatus ({ workingDirectory } as model) =
    Cmd.fromFileData
        { filepath = filepath
        , model = model
        , dataPresentCmdFunc =
            \savedData { originalContent } ->
                let
                    newSaveData =
                        SavedData.removeFileData
                            { filepath = filepath
                            , workingDirectory = workingDirectory
                            }
                            savedData
                in
                Cmd.batch
                    [ Ports.writeFile
                        { path = FilePath.toString filepath
                        , content = originalContent
                        }
                    , Ports.writeFile
                        { path = FilePath.toString model.dataFilePath
                        , content = SavedData.encode newSaveData
                        }
                    ]
        , dataAbsentCmd =
            Ports.printAndExitSuccess
                (Messages.noRecordOfChangeMessage filepath)
        }
