module Commands.Break.Cmd exposing (init)

import Actions exposing (Action)
import Model exposing (BreakData, Command(..), Model)
import Model.SavedData exposing (SavedDataError(..))
import Ports
import Utils.Cmd as Cmd
import Utils.Messages as Messages
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath


init : BreakData -> Model -> Cmd Action
init { filepath } model =
    Cmd.fromFileData
        { filepath = filepath
        , model = model
        , dataPresentCmdFunc =
            \_ _ ->
                Ports.printAndExitSuccess <|
                    Messages.withNewlineBuffers <|
                        (Messages.list <|
                            [ "`"
                                ++ FilePath.toString filepath
                                ++ "` has already had a change introduced to it. "
                                ++ "If you want to reset it to try breaking it in a different way, "
                                ++ " run this first:"
                            , "    `debug_trainer reset " ++ FilePath.toString filepath ++ "`"
                            , "After that you'll be able to run the `break` command again."
                            ]
                        )
        , dataAbsentCmd =
            Cmd.batch
                [ Ports.print <|
                    Messages.withNewlineBuffers <|
                        ("Breaking `"
                            ++ FilePath.toString filepath
                            ++ "`..."
                        )
                , Ports.readFile (FilePath.toString filepath)
                ]
        }
