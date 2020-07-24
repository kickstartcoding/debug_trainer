module Commands.Reset.Cmd exposing (init)

import Actions exposing (Action)
import Model exposing (Command(..), Model)
import Model.SavedData as SavedData exposing (SavedDataError(..))
import Ports
import Utils.Cmd
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath exposing (FilePath)


init : FilePath -> Model -> Cmd Action
init filepath ({ workingDirectory } as model) =
    Utils.Cmd.fromFileData filepath
        model
        (\savedData { originalContent } ->
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
        )
