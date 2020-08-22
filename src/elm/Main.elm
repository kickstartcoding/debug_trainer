module Main exposing (main)

import Actions exposing (Action)
import Cli.Option as Option
import Cli.OptionsParser as OptionsParser
import Cli.Program as Program
import Commands.Break.Cmd
import Commands.Explain.Cmd
import Commands.Hint.Cmd
import Commands.Interactive.Cmd
import Commands.Reset.Cmd
import Model as Model exposing (CliOptions, Command(..), Flags, HintType(..), Model)
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
                |> OptionsParser.with (Option.optionalKeywordArg "count")
                |> OptionsParser.with (Option.requiredPositionalArg "filepath")
                |> OptionsParser.with (Option.flag "log")
                |> OptionsParser.with (Option.flag "test")
                |> OptionsParser.withDoc "Randomly introduce an error into the specified file. Or introduce several errors by using the `--count` flag to specify how many errors you want introduced."
            )
        |> Program.add
            (OptionsParser.buildSubCommand "error-type-hint" (Model.hintInit ErrorDescription)
                |> OptionsParser.with (Option.requiredPositionalArg "filepath")
                |> OptionsParser.with (Option.flag "log")
                |> OptionsParser.with (Option.flag "test")
                |> OptionsParser.withDoc "Display a hint that explains what type of error was introduced into the specified file."
            )
        |> Program.add
            (OptionsParser.buildSubCommand "line-hint" (Model.hintInit LineNumber)
                |> OptionsParser.with (Option.requiredPositionalArg "filepath")
                |> OptionsParser.with (Option.flag "log")
                |> OptionsParser.with (Option.flag "test")
                |> OptionsParser.withDoc "Display a hint that tells you the line number where the error was introduced into the specified file."
            )
        |> Program.add
            (OptionsParser.buildSubCommand "explain" Model.explainInit
                |> OptionsParser.with (Option.requiredPositionalArg "filepath")
                |> OptionsParser.with (Option.flag "log")
                |> OptionsParser.with (Option.flag "test")
                |> OptionsParser.withDoc "Explain the specific change that was made in the specified file."
            )
        |> Program.add
            (OptionsParser.buildSubCommand "reset" Model.resetInit
                |> OptionsParser.with (Option.requiredPositionalArg "filepath")
                |> OptionsParser.with (Option.flag "log")
                |> OptionsParser.with (Option.flag "test")
                |> OptionsParser.withDoc "Change the specified file back to its original, unbroken state."
            )
        |> Program.add
            (OptionsParser.build Model.interactiveInit
                |> OptionsParser.withOptionalPositionalArg (Option.optionalPositionalArg "filepath")
                |> OptionsParser.withRestArgs (Option.restArgs "flags")
                |> OptionsParser.withDoc "Pass just a filepath and debug_trainer will run in interactive mode."
            )


init : Flags -> CliOptions -> ( Model, Cmd Action )
init { randomNumbers, workingDirectory, data, dataFilePath } { command } =
    let
        -- This line is useless but seems to be able to make the askUserMultipleChoice port
        -- actually exist. No idea why it doesn't exist otherwise
        _ =
            Ports.askUserMultipleChoice

        model =
            { randomNumbers = randomNumbers
            , workingDirectory = workingDirectory
            , dataFilePath = FilePath.fromString dataFilePath
            , savedDataResult = SavedData.fromFlag data
            , command = command
            }
    in
    ( model
    , case command of
        Interactive phase ->
            Commands.Interactive.Cmd.init phase

        Break breakData ->
            Commands.Break.Cmd.init breakData model

        Hint filepath hintType ->
            Commands.Hint.Cmd.init filepath hintType model

        Explain filepath ->
            Commands.Explain.Cmd.init filepath model

        Reset filepath fileSaveStatus ->
            Commands.Reset.Cmd.init filepath fileSaveStatus model
    )


main :
    Program.StatefulProgram Model
        Action
        CliOptions
        { randomNumbers : List Int
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
