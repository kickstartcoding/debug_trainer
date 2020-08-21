module Commands.Interactive.Subscriptions exposing (subscriptions)

import Commands.Interactive.Actions exposing (Action(..))
import Model exposing (Command(..), InteractionPhase(..), Model)
import Ports


subscriptions : Model -> Sub Action
subscriptions model =
    case model.command of
        Interactive _ Start ->
            Ports.successfulFileRead GotTargetFileContent

        Interactive _ (BreakingFile data) ->
            Ports.successfulFileWrite (\_ -> PresentSolveMenu data)

        Interactive _ (Solving data) ->
            Sub.batch
                [ Ports.receiveUserAnswer (ReceivedUserSolveMenuChoice data)
                , Ports.finishedPrinting (\_ -> PresentSolveMenu data)
                ]

        Interactive _ Solved ->
            Sub.batch
                [ Ports.receiveUserAnswer ReceivedUserRestartMenuChoice
                , Ports.finishedPrinting (\_ -> PresentRestartMenu)
                ]

        Interactive _ ResettingAndExiting ->
            Sub.batch
                [ Ports.successfulFileWrite (\_ -> Exit)
                ]

        _ ->
            Sub.none
