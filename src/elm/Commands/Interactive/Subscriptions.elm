module Commands.Interactive.Subscriptions exposing (subscriptions)

import Commands.Interactive.Actions exposing (Action(..))
import Model exposing (Command(..), InteractionPhase(..), Model)
import Ports
import Utils.Types.FilePath as FilePath


subscriptions : Model -> Sub Action
subscriptions model =
    Sub.batch
        [ Ports.receiveFileChoice (FilePath.fromString >> GotTargetFileChoice)
        , case model.command of
            Interactive SelectingTargetFile ->
                Sub.none

            Interactive (ReadingTargetFile _) ->
                Ports.successfulFileRead GotTargetFileContent

            Interactive (BreakingFile data) ->
                Ports.successfulFileWrite (\_ -> PresentSolveMenu data)

            Interactive (Solving data) ->
                Sub.batch
                    [ Ports.receiveUserAnswer (ReceivedUserSolveMenuChoice data)
                    , Ports.finishedPrinting (\_ -> PresentSolveMenu data)
                    ]

            Interactive (Solved filepath) ->
                Sub.batch
                    [ Ports.receiveUserAnswer (ReceivedUserRestartMenuChoice filepath)
                    , Ports.finishedPrinting (\_ -> PresentRestartMenu)
                    ]

            Interactive ResettingAndExiting ->
                Sub.batch
                    [ Ports.successfulFileWrite (\_ -> Exit)
                    ]

            _ ->
                Sub.none
        ]
