module Commands.Hint.Update exposing (update)

import Commands.Hint.Actions exposing (Action(..))
import Model exposing (Command(..), HintType, Model)
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath exposing (FilePath)


update : FilePath -> HintType -> Action -> Model -> ( Model, Cmd Action )
update _ _ action model =
    case action of
        NoOp ->
            ( model, Cmd.none )
