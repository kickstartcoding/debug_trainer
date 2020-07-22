module Commands.Hint.Cmd exposing (init)

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
                Just change ->
                    case change.breakType of
                        CaseSwap ->
                            Ports.printAndExitSuccess
                                ("\n\n"
                                    ++ "HINT: Somewhere in this file, debug_trainer changed a word from "
                                    ++ "starting with a capital letter to starting with "
                                    ++ "a lowercase letter or vice versa."
                                    ++ "\n\n"
                                )

                        RemoveReturn ->
                            Ports.printAndExitSuccess
                                ("\n\n"
                                    ++ "HINT: Somewhere in this file, debug_trainer removed "
                                    ++ "a `return` keyword from a function."
                                    ++ "\n\n"
                                )

                        ChangeFunctionArgs ->
                            Ports.printAndExitSuccess
                                ("\n\n"
                                    ++ "HINT: Somewhere in this file, debug_trainer changed "
                                    ++ "the arguments to a function."
                                    ++ "\n\n"
                                )

                Nothing ->
                    Ports.printAndExitFailure
                        ("\n\n"
                            ++ "debug_trainer has no record of "
                            ++ FilePath.toString filepath
                            ++ " being changed."
                            ++ "\n\n"
                        )

        Err error ->
            error
                |> SavedData.errorMessage dataFilePath
                |> Ports.printAndExitFailure
