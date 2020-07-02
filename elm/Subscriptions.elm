module Subscriptions exposing (subscriptions)

import Actions exposing (Action(..))
import Model exposing (Model)
import Ports


subscriptions : Model -> Sub Action
subscriptions model =
    Sub.batch
        [ Ports.receiveFileContents ReceiveFileContents ]
