module Commands.Interactive.Cmd exposing (init, readTargetFile)

import Model exposing (Command(..), HintType(..), InteractionPhase(..))
import Model.SavedData exposing (SavedDataError(..))
import Ports
import Utils.Cmd as Cmd
import Utils.Messages as Messages
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


init : InteractionPhase -> Cmd action
init phase =
    case phase of
        SelectingBreakCount _ ->
            Ports.askUserForANumber
                { name = "break count"
                , message = "How many errors would you like me to put in your file (I can do up to 10)?"
                , min = 1
                , max = 10
                }

        SelectingTargetFile ->
            Ports.chooseRandomFile ()

        ReadingTargetFile filepath ->
            readTargetFile filepath

        BreakingFile _ ->
            Cmd.none

        Solving _ ->
            Cmd.none

        Solved _ ->
            Cmd.none

        ResettingAndExiting ->
            Cmd.none


readTargetFile : FilePath -> Cmd action
readTargetFile filepath =
    Cmd.batch
        [ Ports.print <|
            Messages.withNewlineBuffers <|
                ("Breaking `"
                    ++ FilePath.toString filepath
                    ++ "`..."
                )
        , Ports.readFile (FilePath.toString filepath)
        ]
