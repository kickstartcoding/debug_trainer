module Subscriptions exposing (subscriptions)

-- import Commands.Break.Actions

import Actions exposing (Action(..))
import Commands.Break.Subscriptions
import Model exposing (Command(..), Model)
import Ports


subscriptions : Model -> Sub Action
subscriptions ({ command } as model) =
    case command of
        Break filename ->
            Sub.map (BreakAction filename) (Commands.Break.Subscriptions.subscriptions model)

        Hint _ ->
            Sub.none

        Reset _ ->
            Sub.none
