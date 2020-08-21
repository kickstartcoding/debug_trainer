module Commands.Interactive.Cmd exposing (init)

import Actions exposing (Action)
import Model exposing (Command(..), HintType(..), Model)
import Model.SavedData exposing (SavedDataError(..))
import Ports
import Utils.Cmd as Cmd
import Utils.Messages as Messages
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


init : FilePath -> Model -> Cmd action
init filepath model =
    Cmd.batch
        [ Ports.print <|
            Messages.withNewlineBuffers <|
                ("Breaking `"
                    ++ FilePath.toString filepath
                    ++ "`..."
                )
        , Ports.readFile (FilePath.toString filepath)
        ]
