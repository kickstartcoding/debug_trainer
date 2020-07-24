module Commands.Explain.Update exposing (update)

import Commands.Explain.Actions exposing (Action(..))
import Model exposing (Command(..), Model)
import Utils.Types.FilePath exposing (FilePath)


update : FilePath -> Action -> Model -> ( Model, Cmd Action )
update filepath action model =
    case action of
        NoOp ->
            ( model, Cmd.none )
