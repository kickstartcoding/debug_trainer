module Subscriptions exposing (subscriptions)

import Actions exposing (Action(..))
import Commands.Break.Subscriptions
import Model exposing (Command(..), Model)


subscriptions : Model -> Sub Action
subscriptions ({ command } as model) =
    case command of
        Break filename ->
            Sub.map (BreakAction filename) (Commands.Break.Subscriptions.subscriptions model)

        Hint _ _ ->
            Sub.none

        Explain _ ->
            Sub.none

        Reset _ ->
            Sub.none
