module Commands.Reset.Cmd exposing (init)

import Actions exposing (Action)
import Model exposing (Command(..), Model)
import Model.SavedData as SavedData exposing (SavedDataError(..))
import Ports
import Utils.Cmd as Cmd
import Utils.Messages as Messages
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath exposing (FilePath)


init : FilePath -> Model -> Cmd Action
init filepath ({ workingDirectory } as model) =
    Cmd.fromFileData
        { filepath = filepath
        , model = model
        , dataPresentCmdFunc =
            \savedData { originalContent } ->
                Ports.writeFileWith
                    { path = filepath
                    , contents = originalContent
                    , dataToSave =
                        SavedData.removeFileData
                            { filepath = filepath
                            , workingDirectory = workingDirectory
                            }
                            savedData
                    }
        , dataAbsentCmd =
            Ports.printAndExitSuccess
                (Messages.noRecordOfChangeMessage filepath)
        }
