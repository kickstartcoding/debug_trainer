module Commands.Break.Cmd exposing (init)

import Actions exposing (Action)
import Model exposing (Command(..), FileSaveStatus, Model)
import Model.SavedData exposing (SavedDataError(..))
import Ports
import Utils.Cmd as Cmd
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


init : FilePath -> FileSaveStatus -> Model -> Cmd Action
init filepath fileSaveStatus model =
    Cmd.fromFileData
        { filepath = filepath
        , model = model
        , dataPresentCmdFunc =
            \_ _ ->
                Ports.printAndExitSuccess
                    ("\n\n"
                        ++ FilePath.toString filepath
                        ++ " has already had a change introduced to it. "
                        ++ "If you want to reset it to try breaking it in a different way, "
                        ++ " run:\n\ndebug_trainer reset "
                        ++ FilePath.toString filepath
                        ++ "\n\nAfter that you'll be able to run the `break` command again."
                    )
        , dataAbsentCmd =
            Cmd.batch
                [ Ports.print
                    ("\n\n"
                        ++ "Breaking "
                        ++ FilePath.toString filepath
                        ++ "..."
                        ++ "\n\n"
                    )
                , Ports.readFile (FilePath.toString filepath)
                ]
        }
