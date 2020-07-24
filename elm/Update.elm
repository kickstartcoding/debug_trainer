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
        ( Break filepath fileSaveStatus, BreakAction subAction ) ->
            let
                ( newModel, cmd ) =
                    Commands.Break.Update.update filepath fileSaveStatus subAction model
            in
            ( newModel, Cmd.map BreakAction cmd )

        ( Hint filepath hintNumber, HintAction subAction ) ->
            let
                ( newModel, cmd ) =
                    Commands.Hint.Update.update filepath hintNumber subAction model
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



-- case action of
--     BreakAction filepath fileSaveStatus subAction ->
--         let
--             ( newModel, cmd ) =
--                 Commands.Break.Update.update filepath  subAction model
--         in
--         ( newModel, Cmd.map (BreakAction filepath fileSaveStatus) cmd )
--     HintAction filepath subAction ->
--         let
--             ( newModel, cmd ) =
--                 Commands.Hint.Update.update filepath subAction model
--         in
--         ( newModel, Cmd.map (HintAction filepath) cmd )
--     ExplainAction filepath subAction ->
--         let
--             ( newModel, cmd ) =
--                 Commands.Explain.Update.update filepath subAction model
--         in
--         ( newModel, Cmd.map (ExplainAction filepath) cmd )
--     ResetAction filepath subAction ->
--         let
--             ( newModel, cmd ) =
--                 Commands.Reset.Update.update filepath subAction model
--         in
--         ( newModel, Cmd.map (ResetAction filepath) cmd )
