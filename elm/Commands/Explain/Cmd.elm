module Commands.Explain.Cmd exposing (init)

import Actions exposing (Action)
import Model exposing (Command(..), Model)
import Model.SavedData exposing (SavedDataError(..))
import Ports
import Utils.Cmd
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath exposing (FilePath)


init : FilePath -> Model -> Cmd Action
init filepath model =
    Utils.Cmd.fromFileData filepath
        model
        (\_ _ ->
            Ports.printAndExitSuccess "Feature not implemented yet."
        )
