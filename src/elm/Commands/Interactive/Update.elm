module Commands.Interactive.Update exposing (update)

import Commands.Break.Update.BreakFile
import Commands.Hint.Actions exposing (Action(..))
import Commands.Interactive.Actions exposing (Action(..))
import Commands.Interactive.Cmd as Cmd
import Commands.Interactive.QuestionOptions as QuestionOptions
import Model exposing (Command(..), InteractionPhase(..), Model)
import Ports
import Random
import Utils.Messages as Messages
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


update : FilePath -> Action -> Model -> ( Model, Cmd Action )
update filepath action model =
    case action of
        GotTargetFileContent { content } ->
            let
                maybeBroken =
                    Commands.Break.Update.BreakFile.run
                        { breakCount = 1
                        , filepath = filepath
                        , fileContent = content
                        , randomNumbers = model.randomNumbers
                        }
            in
            case maybeBroken of
                Just { newFileContent, changes } ->
                    ( { model
                        | command =
                            Interactive filepath
                                (BreakingFile
                                    { originalContent = content
                                    , updatedContent = newFileContent
                                    , changes = changes
                                    }
                                )
                      }
                    , Ports.writeFile
                        { path = FilePath.toString filepath
                        , content = newFileContent
                        }
                    )

                Nothing ->
                    ( model
                    , Ports.printAndExitFailure "Error: unable to find a good way to introduce an error into this file."
                    )

        PresentSolveMenu fileData ->
            ( { model | command = Interactive filepath (Solving fileData) }
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

        ReceivedUserSolveMenuChoice ({ originalContent } as fileData) choice ->
            if choice == QuestionOptions.solved then
                ( { model | command = Interactive filepath Solved }
                , Cmd.batch
                    [ Ports.printAndReturn (Messages.withNewlineBuffers "Congratulations; nice work!")
                    , Ports.writeFile
                        { path = FilePath.toString filepath
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
                ( { model | command = Interactive filepath ResettingAndExiting }
                , Ports.writeFile
                    { path = FilePath.toString filepath
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
                    , QuestionOptions.exit
                    ]
                }
            )

        ReceivedUserRestartMenuChoice choice ->
            if choice == QuestionOptions.tryAgain then
                ( { model
                    | command = Interactive filepath Start
                    , randomNumbers = rerandomizeAll model.randomNumbers
                  }
                , Cmd.init filepath model
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
