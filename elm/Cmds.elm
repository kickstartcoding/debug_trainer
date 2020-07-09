module Cmds exposing (init)

import Actions exposing (Action)
import Json.Encode as Encode
import Model exposing (Command(..), Model)
import Ports
import SavedData.Model as SavedData exposing (SavedDataError(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


init : Model -> Cmd Action
init ({ command } as model) =
    case command of
        Break filepath _ ->
            forBreak filepath model

        Hint filepath _ ->
            forHint filepath model

        Reset filepath ->
            forReset filepath model


forBreak : FilePath -> Model -> Cmd Action
forBreak filepath { savedDataResult, dataFilePath } =
    case savedDataResult of
        Ok data ->
            case SavedData.getChange filepath data of
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

        Err (DecodingFailed reason) ->
            errorCmds (DecodingFailed reason) dataFilePath


forHint : FilePath -> Model -> Cmd Action
forHint filepath { savedDataResult, dataFilePath } =
    case savedDataResult of
        Ok data ->
            case SavedData.getChange filepath data of
                Just change ->
                    case change of
                        SavedData.CaseSwap _ ->
                            Ports.printAndExitSuccess
                                ("\n\n"
                                    ++ "HINT: Somewhere in this file, debug_trainer changed a word from "
                                    ++ "starting with a capital letter to starting with "
                                    ++ "a lowercase letter or vice versa."
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
            errorCmds error dataFilePath


forReset : FilePath -> Model -> Cmd Action
forReset filepath { savedDataResult, dataFilePath } =
    case savedDataResult of
        Ok data ->
            case SavedData.getFileData filepath data of
                Just { originalContent } ->
                    Ports.writeFileWith
                        { path = filepath
                        , contents = originalContent
                        , dataToSave = SavedData.removeFileData filepath data
                        }

                Nothing ->
                    Ports.printAndExitFailure
                        ("\n\n"
                            ++ "debug_trainer has no record of "
                            ++ FilePath.toString filepath
                            ++ " being changed. Either it has never been changed or "
                            ++ "the changes that were made have been reverted."
                            ++ "\n\n"
                        )

        Err error ->
            errorCmds error dataFilePath


errorCmds : SavedDataError -> FilePath -> Cmd Action
errorCmds error dataFilePath =
    case error of
        FileMissing ->
            Ports.printAndExitFailure
                ("\n\n"
                    ++ "Could not find any save data at "
                    ++ FilePath.toString dataFilePath
                    ++ ". That file is where debug_trainer stores data on what files it has changed."
                    ++ " Without it, this feature won't work."
                    ++ "\n\n"
                )

        DecodingFailed reason ->
            Ports.printAndExitFailure
                ("\n\n"
                    ++ "Unable to parse the saved data file at "
                    ++ FilePath.toString dataFilePath
                    ++ ". Here is the error it gave:\n\n"
                    ++ reason
                    ++ "\n\nThe save file at "
                    ++ FilePath.toString dataFilePath
                    ++ " may be broken. If this error persists, try deleting "
                    ++ FilePath.toString dataFilePath
                    ++ " and then running debug_trainer again."
                    ++ "\n\n"
                )
