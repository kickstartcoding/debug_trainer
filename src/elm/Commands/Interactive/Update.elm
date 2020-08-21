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


update : Action -> Model -> ( Model, Cmd Action )
update action model =
    case action of
        GotTargetFileChoice filepath ->
            ( { model | command = Interactive (ReadingTargetFile filepath) }
            , readTargetFile filepath
            )

        GotTargetFileContent { path, content } ->
            let
                maybeBroken =
                    Commands.Break.Update.BreakFile.run
                        { breakCount = 1
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
                            Interactive
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

        PresentSolveMenu fileData ->
            ( { model | command = Interactive (Solving fileData) }
            , Ports.askUser
                { question = "Options"
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
                ( { model | command = Interactive (Solved path) }
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
                ( { model | command = Interactive ResettingAndExiting }
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
            , Ports.askUser
                { question = "Options"
                , options =
                    [ QuestionOptions.tryAgain
                    , QuestionOptions.breakADifferentFile
                    , QuestionOptions.exit
                    ]
                }
            )

        ReceivedUserRestartMenuChoice filepath choice ->
            if choice == QuestionOptions.tryAgain then
                ( { model
                    | command = Interactive (ReadingTargetFile filepath)
                    , randomNumbers = rerandomizeAll model.randomNumbers
                  }
                , Cmd.init (ReadingTargetFile filepath)
                )

            else if choice == QuestionOptions.breakADifferentFile then
                ( { model
                    | command = Interactive SelectingTargetFile
                    , randomNumbers = rerandomizeAll model.randomNumbers
                  }
                , Cmd.init SelectingTargetFile
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
