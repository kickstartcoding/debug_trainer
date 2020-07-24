module Commands.Explain.Cmd exposing (init)

import Actions exposing (Action)
import Model exposing (Command(..), Model)
import Model.SavedData exposing (SavedDataError(..))
import Ports
import Utils.Cmd as Cmd
import Utils.Messages as Messages
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath exposing (FilePath)


init : FilePath -> Model -> Cmd Action
init filepath model =
    Cmd.fromFileData
        { filepath = filepath
        , model = model
        , dataPresentCmdFunc =
            \_ _ ->
                Ports.printAndExitSuccess "Feature not implemented yet."
        , dataAbsentCmd =
            Ports.printAndExitSuccess
                (Messages.noRecordOfChangeMessage filepath)
        }
