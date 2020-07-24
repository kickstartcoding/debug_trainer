module Main exposing (main)

import Actions exposing (Action)
import Cli.Option as Option
import Cli.OptionsParser as OptionsParser
import Cli.Program as Program
import Commands.Break.Cmd
import Commands.Explain.Cmd
import Commands.Hint.Cmd
import Commands.Reset.Cmd
import Model as Model exposing (CliOptions, Command(..), Flags, Model)
import Model.SavedData as SavedData exposing (SavedDataError(..))
import Ports
import Subscriptions exposing (subscriptions)
import Update exposing (update)
import Utils.Types.FilePath as FilePath


programConfig : Program.Config CliOptions
programConfig =
    Program.config
        |> Program.add
            (OptionsParser.buildSubCommand "break" Model.breakInit
                |> OptionsParser.with (Option.requiredPositionalArg "filepath")
                |> OptionsParser.with (Option.flag "log")
                |> OptionsParser.with (Option.flag "test")
                |> OptionsParser.withDoc "Randomly introduce an error into the specified file."
            )
        |> Program.add
            (OptionsParser.buildSubCommand "hint" Model.hintInit
                |> OptionsParser.with (Option.optionalKeywordArg "hint-number")
                |> OptionsParser.with (Option.requiredPositionalArg "filepath")
                |> OptionsParser.with (Option.flag "log")
                |> OptionsParser.with (Option.flag "test")
                |> OptionsParser.withDoc "Display a hint about the error that was introduced into the specified file."
            )
        -- |> Program.add
        --     (OptionsParser.buildSubCommand "explain" Model.explainInit
        --         |> OptionsParser.with (Option.requiredPositionalArg "filepath")
        --         |> OptionsParser.with (Option.flag "log")
        --         |> OptionsParser.with (Option.flag "test")
        --         |> OptionsParser.withDoc "Explain the specific change that was made in the specified file."
        --     )
        |> Program.add
            (OptionsParser.buildSubCommand "reset" Model.resetInit
                |> OptionsParser.with (Option.requiredPositionalArg "filepath")
                |> OptionsParser.with (Option.flag "log")
                |> OptionsParser.with (Option.flag "test")
                |> OptionsParser.withDoc "Change the specified file back to its original, unbroken state."
            )


init : Flags -> CliOptions -> ( Model, Cmd Action )
init { randomNumber1, randomNumber2, workingDirectory, data, dataFilePath } { command } =
    let
        model =
            { randomNumbers =
                { breakTypeInt = randomNumber1
                , segmentToBreakInt = randomNumber2
                }
            , workingDirectory = workingDirectory
            , dataFilePath = FilePath.fromString dataFilePath
            , savedDataResult = SavedData.fromFlag data
            , command = command
            }
    in
    ( model
    , case command of
        Break filepath ->
            Commands.Break.Cmd.init filepath model

        Hint filepath hintNumber ->
            Commands.Hint.Cmd.init filepath hintNumber model

        Explain filepath ->
            Commands.Explain.Cmd.init filepath model

        Reset filepath ->
            Commands.Reset.Cmd.init filepath model
    )


main :
    Program.StatefulProgram Model
        Action
        CliOptions
        { randomNumber1 : Int
        , randomNumber2 : Int
        , workingDirectory : String
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
