module Update exposing (update)

import Actions exposing (Action(..))
import Commands.Break.Update
import Commands.Explain.Update
import Commands.Hint.Update
import Commands.Reset.Update
import Model exposing (CliOptions, Command(..), Model)
import Ports


update : CliOptions -> Action -> Model -> ( Model, Cmd Action )
update _ action ({ command } as model) =
    case ( command, action ) of
        ( Break breakData, BreakAction subAction ) ->
            let
                ( newModel, cmd ) =
                    Commands.Break.Update.update breakData subAction model
            in
            ( newModel, Cmd.map BreakAction cmd )

        ( Hint filepath hintType, HintAction subAction ) ->
            let
                ( newModel, cmd ) =
                    Commands.Hint.Update.update filepath hintType subAction model
            in
            ( newModel, Cmd.map HintAction cmd )

        ( Explain filepath, ExplainAction subAction ) ->
            let
                ( newModel, cmd ) =
                    Commands.Explain.Update.update filepath subAction model
            in
            ( newModel, Cmd.map ExplainAction cmd )

        ( Reset filepath fileSaveStatus, ResetAction subAction ) ->
            let
                ( newModel, cmd ) =
                    Commands.Reset.Update.update filepath fileSaveStatus subAction model
            in
            ( newModel, Cmd.map ResetAction cmd )

        ( _, _ ) ->
            ( model
            , Ports.printAndExitFailure
                "Encountered a bug in the program: mismatched command and action."
            )
