module Commands.Interactive.Update exposing (update)

import Commands.Break.Update.BreakFile
import Commands.Hint.Actions exposing (Action(..))
import Commands.Interactive.Actions exposing (Action(..))
import Commands.Interactive.Cmd as Cmd exposing (readTargetFile)
import Commands.Interactive.QuestionOptions as QuestionOptions
import Model exposing (Command(..), InteractionPhase(..), Model)
import Ports
import Random
import Utils.Messages as Messages
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath


update : Int -> Action -> Model -> ( Model, Cmd Action )
update breakCount action model =
    case action of
        ReceivedUserBreakCountChoice maybeFilePath newBreakCount ->
            case model.command of
                Interactive _ (Solved filepath) ->
                    ( { model | command = Interactive newBreakCount (Solved filepath) }
                    , Ports.askUserMultipleChoice
                        { name = "restart menu"
                        , message =
                            "Error count changed to "
                                ++ String.fromInt newBreakCount
                                ++ "! What do you want to do now?"
                        , options =
                            [ QuestionOptions.tryAgain
                            , QuestionOptions.breakADifferentFile
                            , QuestionOptions.changeBreakCount
                            , QuestionOptions.exit
                            ]
                        }
                    )

                _ ->
                    let
                        newPhase =
                            case maybeFilePath of
                                Just filepath ->
                                    ReadingTargetFile filepath

                                Nothing ->
                                    SelectingTargetFile
                    in
                    ( { model | command = Interactive newBreakCount newPhase }, Cmd.init newPhase )

        GotTargetFileChoice filepath ->
            ( { model | command = Interactive breakCount (ReadingTargetFile filepath) }
            , readTargetFile filepath
            )

        GotTargetFileContent { path, content } ->
            let
                maybeBroken =
                    Commands.Break.Update.BreakFile.run
                        { breakCount = breakCount
                        , filepath = FilePath.fromString path
                        , fileContent = content

                        -- , fileContent = Debug.log "GotTargetFileContent content" content
                        , randomNumbers = model.randomNumbers
                        }
            in
            case maybeBroken of
                Just { newFileContent, changes } ->
                    ( { model
                        | command =
                            Interactive breakCount
                                (BreakingFile
                                    { originalContent = content
                                    , updatedContent = newFileContent
                                    , changes = changes
                                    , path = FilePath.fromString path
                                    }
                                )
                      }
                    , Ports.writeFile
                        { path = path
                        , content = newFileContent
                        }
                    )

                Nothing ->
                    ( model
                    , Ports.printAndExitFailure "Error: unable to find a good way to introduce an error into this file."
                    )

        PresentSolveMenu ({ path } as fileData) ->
            ( { model | command = Interactive breakCount (Solving fileData) }
            , Ports.askUserMultipleChoice
                { name = "solve menu"
                , message =
                    ""
                        ++ FilePath.toString path
                        ++ " has been broken. See if you can figure out what I did!\n\n"
                        ++ "IMPORTANT: be careful not to use control+c to exit "
                        ++ "debug_trainer without fixing the file — I can't reset "
                        ++ "the file(s) I broke if you exit that way."
                        ++ "\n\nOptions"
                , options =
                    [ QuestionOptions.solved
                    , QuestionOptions.lineHint
                    , QuestionOptions.errorTypeHint
                    , QuestionOptions.explanation
                    , QuestionOptions.resetAndExit
                    ]
                }
            )

        ReceivedUserSolveMenuChoice ({ originalContent, path } as fileData) choice ->
            if choice == QuestionOptions.solved then
                ( { model | command = Interactive breakCount (Solved path) }
                , Cmd.batch
                    [ Ports.printAndReturn (Messages.withNewlineBuffers "Congratulations; nice work!")
                    , Ports.writeFile
                        { path = FilePath.toString path
                        , content = originalContent
                        }
                    ]
                )

            else if choice == QuestionOptions.lineHint then
                ( model
                , Ports.printAndReturn (Messages.lineNumberHint fileData)
                )

            else if choice == QuestionOptions.errorTypeHint then
                ( model
                , Ports.printAndReturn (Messages.errorTypeHint fileData)
                )

            else if choice == QuestionOptions.explanation then
                ( model
                , Ports.printAndReturn (Messages.breakExplanation fileData)
                )

            else if choice == QuestionOptions.resetAndExit then
                ( { model | command = Interactive breakCount ResettingAndExiting }
                , Ports.writeFile
                    { path = FilePath.toString path
                    , content = originalContent
                    }
                )

            else
                ( model
                , Cmd.none
                )

        PresentRestartMenu ->
            ( model
            , Ports.askUserMultipleChoice
                { name = "restart menu"
                , message = "Congratulations; you solved it! What do you want to do now?"
                , options =
                    [ QuestionOptions.tryAgain
                    , QuestionOptions.breakADifferentFile
                    , QuestionOptions.changeBreakCount
                    , QuestionOptions.exit
                    ]
                }
            )

        ReceivedUserRestartMenuChoice filepath choice ->
            if choice == QuestionOptions.tryAgain then
                ( { model
                    | command = Interactive breakCount (ReadingTargetFile filepath)
                    , randomNumbers = rerandomizeAll model.randomNumbers
                  }
                , Cmd.init (ReadingTargetFile filepath)
                )

            else if choice == QuestionOptions.breakADifferentFile then
                ( { model
                    | command = Interactive breakCount SelectingTargetFile
                    , randomNumbers = rerandomizeAll model.randomNumbers
                  }
                , Cmd.init SelectingTargetFile
                )

            else if choice == QuestionOptions.changeBreakCount then
                ( { model | randomNumbers = rerandomizeAll model.randomNumbers }
                , Cmd.init (SelectingBreakCount (Just filepath))
                )

            else if choice == QuestionOptions.exit then
                ( model
                , Ports.printAndExitSuccess (Messages.withNewlineBuffers "Bye!")
                )

            else
                ( model
                , Ports.printAndExitSuccess (Messages.withNewlineBuffers "Bye!")
                )

        Exit ->
            ( model
            , Ports.printAndExitSuccess (Messages.withNewlineBuffers "Bye!")
            )


rerandomizeAll : List Int -> List Int
rerandomizeAll randomNumberList =
    randomNumberList
        |> List.map
            (\int ->
                Random.step (Random.int 0 1000000) (Random.initialSeed int)
                    |> Tuple.first
            )
