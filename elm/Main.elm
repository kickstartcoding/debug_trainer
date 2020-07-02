module Main exposing (main)

import Actions exposing (Action)
import Cli.Option as Option
import Cli.OptionsParser as OptionsParser
import Cli.Program as Program
import Codec
import Json.Decode
import Model exposing (Model, TrainerOptions)
import Ports
import SavedData.Model
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
init { randomNumber, data } { filepath } =
    let
        mode =
            Model.Break filepath Model.ReadingFile

        cmds =
            Cmd.batch
                [ Ports.print ("Breaking " ++ filepath ++ "...")
                , Ports.readFile filepath
                ]
    in
    case data of
        Just string ->
            case Codec.decodeString SavedData.Model.codec string of
                Ok savedData ->
                    ( { randomNumber = randomNumber
                      , savedData = savedData
                      , mode = mode
                      }
                    , cmds
                    )

                Err error ->
                    ( { randomNumber = randomNumber
                      , savedData = SavedData.Model.init
                      , mode = mode
                      }
                    , Cmd.batch
                        [ cmds
                        , Ports.print
                            ("Could not parse saved data file. It may be replaced. Error: "
                                ++ Json.Decode.errorToString error
                            )
                        ]
                    )

        Nothing ->
            ( { randomNumber = randomNumber
              , savedData = SavedData.Model.init
              , mode = mode
              }
            , cmds
            )


type alias Flags =
    Program.FlagsIncludingArgv
        { randomNumber : Int
        , data : Maybe String
        }


main : Program.StatefulProgram Model Action TrainerOptions { randomNumber : Int, data : Maybe String }
main =
    Program.stateful
        { printAndExitFailure = Ports.printAndExitFailure
        , printAndExitSuccess = Ports.printAndExitSuccess
        , init = init
        , config = programConfig
        , update = update
        , subscriptions = subscriptions
        }
