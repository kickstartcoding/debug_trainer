module Main exposing (main)

import Actions exposing (Action)
import Cli.Option as Option
import Cli.OptionsParser as OptionsParser
import Cli.Program as Program
import Model as Model exposing (CliOptions, Command(..), Flags, Model)
import Ports
import SavedData.Model as SavedData exposing (SavedDataError(..))
import Subscriptions exposing (subscriptions)
import Update exposing (update)
import Utils.Types.FilePath as FilePath exposing (FilePath)
import Utils.Types.LoggingStatus exposing (LoggingStatus)


programConfig : Program.Config CliOptions
programConfig =
    Program.config
        |> Program.add
            (OptionsParser.buildSubCommand "hint" Model.hintInit
                |> OptionsParser.with (Option.requiredPositionalArg "filepath")
                |> OptionsParser.with (Option.flag "log")
                |> OptionsParser.withDoc "Display a hint about the error that was introduced."
            )
        |> Program.add
            (OptionsParser.build Model.breakInit
                |> OptionsParser.with (Option.requiredPositionalArg "filepath")
                |> OptionsParser.with (Option.flag "log")
                |> OptionsParser.withDoc "Break the provided file in a random way."
            )


init : Flags -> CliOptions -> ( Model, Cmd Action )
init { randomNumber, data, dataFilePath } { command, loggingStatus } =
    let
        model =
            { randomNumber = randomNumber
            , dataFilePath = FilePath.fromString dataFilePath
            , savedDataResult = SavedData.fromFlag data
            , command = command
            }
    in
    ( model
    , cmdsFor model
    )


cmdsFor : Model -> Cmd Action
cmdsFor { command, savedDataResult, dataFilePath } =
    case command of
        Break filepath _ ->
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

        Hint filepath _ ->
            case savedDataResult of
                Ok data ->
                    case SavedData.getChange filepath data of
                        Just change ->
                            case change of
                                SavedData.CaseSwap _ ->
                                    Ports.printAndExitSuccess
                                        ("\n\n"
                                            ++ "HINT: Somewhere in this file, we changed a word from "
                                            ++ "starting with a capital letter to starting with "
                                            ++ "a lowercase letter or vice versa."
                                            ++ "\n\n"
                                        )

                        Nothing ->
                            Ports.printAndExitFailure
                                ("\n\n"
                                    ++ "debug_trainer has no record of "
                                    ++ FilePath.toString filepath
                                    ++ " being changed by debug_trainer."
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
                    ++ " Without it, we can't give any hints."
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


main :
    Program.StatefulProgram Model
        Action
        CliOptions
        { randomNumber : Int
        , dataFilePath : String
        , data : Maybe String
        }
main =
    Program.stateful
        { printAndExitFailure = Ports.printAndExitFailure
        , printAndExitSuccess = Ports.printAndExitSuccess
        , init = init
        , config = programConfig
        , update = update
        , subscriptions = subscriptions
        }
