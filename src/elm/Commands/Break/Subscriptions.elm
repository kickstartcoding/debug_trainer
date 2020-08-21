module Commands.Break.Subscriptions exposing (subscriptions)

import Commands.Break.Actions exposing (Action(..))
import Model exposing (Command(..), Model)
import Ports


subscriptions : Model -> Sub Action
subscriptions _ =
    Sub.batch
        [ Ports.successfulFileRead GotTargetFileContent
        , Ports.successfulFileWrite SuccessfullyBrokeTargetFile
        ]
