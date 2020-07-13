module Main exposing (main)

import Actions exposing (Action)
import Cli.Option as Option
import Cli.OptionsParser as OptionsParser
import Cli.Program as Program
import Cmds
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
                |> OptionsParser.withDoc "Randomly introduce an error into the specified file."
            )
        |> Program.add
            (OptionsParser.buildSubCommand "hint" Model.hintInit
                |> OptionsParser.with (Option.requiredPositionalArg "filepath")
                |> OptionsParser.with (Option.flag "log")
                |> OptionsParser.withDoc "Display a hint about the error that was introduced into the specified file."
            )
        |> Program.add
            (OptionsParser.buildSubCommand "reset" Model.resetInit
                |> OptionsParser.with (Option.requiredPositionalArg "filepath")
                |> OptionsParser.with (Option.flag "log")
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
    , Cmds.init model
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
