module Main exposing (main)

import Actions exposing (Action)
import Cli.Option as Option
import Cli.OptionsParser as OptionsParser
import Cli.Program as Program
import Model exposing (Model, TrainerOptions)
import Ports
import Subscriptions exposing (subscriptions)
import Update exposing (update)


programConfig : Program.Config TrainerOptions
programConfig =
    Program.config
        |> Program.add
            (OptionsParser.build TrainerOptions
                |> OptionsParser.with (Option.requiredPositionalArg "filepath")
            )


init : Flags -> TrainerOptions -> ( Model, Cmd Action )
init flags { filepath } =
    ( Model.Break filepath Model.ReadingFile
    , Cmd.batch
        [ Ports.print ("Breaking " ++ filepath ++ "...")
        , Ports.readFile filepath
        ]
    )


type alias Flags =
    Program.FlagsIncludingArgv {}


main : Program.StatefulProgram Model Action TrainerOptions {}
main =
    Program.stateful
        { printAndExitFailure = Ports.printAndExitFailure
        , printAndExitSuccess = Ports.printAndExitSuccess
        , init = init
        , config = programConfig
        , update = update
        , subscriptions = subscriptions
        }
