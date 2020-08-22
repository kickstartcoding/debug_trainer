module Subscriptions exposing (subscriptions)

import Actions exposing (Action(..))
import Commands.Break.Subscriptions
import Commands.Interactive.Subscriptions
import Commands.Reset.Subscriptions
import Model exposing (Command(..), Model)


subscriptions : Model -> Sub Action
subscriptions ({ command } as model) =
    case command of
        Interactive _ _ ->
            Sub.map InteractiveAction (Commands.Interactive.Subscriptions.subscriptions model)

        Break _ ->
            Sub.map BreakAction (Commands.Break.Subscriptions.subscriptions model)

        Hint _ _ ->
            Sub.none

        Explain _ ->
            Sub.none

        Reset _ _ ->
            Sub.map ResetAction (Commands.Reset.Subscriptions.subscriptions model)
