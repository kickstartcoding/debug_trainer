module Commands.Break.Cmd exposing (init)

import Actions exposing (Action)
import Model exposing (Command(..), Model)
import Model.SavedData as SavedData exposing (SavedDataError(..))
import Ports
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


init : FilePath -> Model -> Cmd Action
init filepath { savedDataResult, dataFilePath, workingDirectory } =
    case savedDataResult of
        Ok data ->
            case
                SavedData.getChange
                    { filepath = filepath
                    , workingDirectory = workingDirectory
                    }
                    data
            of
                Just _ ->
                    Ports.printAndExitSuccess
                        ("\n\n"
                            ++ FilePath.toString filepath
                            ++ " has already has a change introduced to it. "
                            ++ "Try fixing that change before breaking it again. "
                            ++ "To get a hint, run:\n\ndebug_trainer hint "
                            ++ FilePath.toString filepath
                            ++ "\n\n"
                        )

                Nothing ->
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

        Err FileMissing ->
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

        Err error ->
            error
                |> SavedData.errorMessage dataFilePath
                |> Ports.printAndExitFailure
