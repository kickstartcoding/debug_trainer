module Commands.Reset.Subscriptions exposing (subscriptions)

import Commands.Reset.Actions exposing (Action(..))
import Model exposing (Command(..), Model)
import Ports


subscriptions : Model -> Sub Action
subscriptions _ =
    Sub.batch
        [ Ports.successfulFileWrite SuccessfulFileWrite
        ]
