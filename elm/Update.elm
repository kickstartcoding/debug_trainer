module Update exposing (update)

import Actions exposing (Action(..))
import Commands.Break.Update
import Commands.Explain.Update
import Commands.Hint.Update
import Commands.Reset.Update
import Model exposing (CliOptions, Command(..), Model)


update : CliOptions -> Action -> Model -> ( Model, Cmd Action )
update _ action model =
    case action of
        BreakAction filepath subAction ->
            let
                ( newModel, cmd ) =
                    Commands.Break.Update.update filepath subAction model
            in
            ( newModel, Cmd.map (BreakAction filepath) cmd )

        HintAction filepath subAction ->
            let
                ( newModel, cmd ) =
                    Commands.Hint.Update.update filepath subAction model
            in
            ( newModel, Cmd.map (HintAction filepath) cmd )

        ExplainAction filepath subAction ->
            let
                ( newModel, cmd ) =
                    Commands.Explain.Update.update filepath subAction model
            in
            ( newModel, Cmd.map (ExplainAction filepath) cmd )

        ResetAction filepath subAction ->
            let
                ( newModel, cmd ) =
                    Commands.Reset.Update.update filepath subAction model
            in
            ( newModel, Cmd.map (ResetAction filepath) cmd )
