module Commands.Reset.Update exposing (update)

import Commands.Reset.Actions exposing (Action(..))
import Model exposing (Command(..), FileSaveStatus, Model)
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath exposing (FilePath)


update : FilePath -> FileSaveStatus -> Action -> Model -> ( Model, Cmd Action )
update _ _ action model =
    case action of
        NoOp ->
            ( model, Cmd.none )
