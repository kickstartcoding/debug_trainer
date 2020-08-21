module Commands.Break.Update exposing (update)

import Commands.Break.Actions exposing (Action(..))
import Commands.Break.Update.BreakFile
import List.Extra as ListEx
import Model exposing (BreakData, Command(..), Model)
import Model.SavedData as SavedData
import PluralRules exposing (Cardinal(..), Rules)
import PluralRules.En
import Ports
import Utils.Cmd as Cmd
import Utils.List
import Utils.Messages as Messages
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath


update : BreakData -> Action -> Model -> ( Model, Cmd Action )
update ({ breakCount, filepath } as breakData) action model =
    case action of
        GotTargetFileContent { content } ->
            let
                maybeBreak =
                    Commands.Break.Update.BreakFile.run
                        { breakCount = breakCount
                        , filepath = filepath
                        , fileContent = content
                        , randomNumbers = model.randomNumbers
                        }
            in
            case maybeBreak of
                Just { newFileContent, changes } ->
                    let
                        oldSavedData =
                            SavedData.savedDataOrInit model.savedDataResult

                        newSavedData =
                            SavedData.setFileData
                                { filepath = filepath
                                , workingDirectory = model.workingDirectory
                                , fileData =
                                    { originalContent = content
                                    , updatedContent = newFileContent
                                    , changes = changes
                                    }
                                }
                                oldSavedData
                    in
                    ( { model | savedDataResult = Ok newSavedData }
                    , Cmd.batch
                        [ Ports.writeFile
                            { path = FilePath.toString filepath
                            , content = newFileContent
                            }
                        , Ports.writeFile
                            { path = FilePath.toString model.dataFilePath
                            , content = SavedData.encode newSavedData
                            }
                        ]
                    )

                Nothing ->
                    ( model
                    , Ports.printAndExitFailure "Error: unable to find a good way to introduce an error into this file."
                    )

        SuccessfullyBrokeTargetFile ->
            confirmTargetFileWrite breakData model

        SuccessfullyUpdatedSavedDataFile ->
            confirmSaveDataFileWrite breakData model


confirmTargetFileWrite : BreakData -> Model -> ( Model, Cmd Action )
confirmTargetFileWrite ({ fileSaveStatus } as breakData) model =
    let
        newBreakData =
            { breakData | fileSaveStatus = { fileSaveStatus | targetFileSaved = True } }

        encouragementNumber =
            model.randomNumbers
                |> ListEx.last
                |> Maybe.withDefault 0

        newModel =
            { model | command = Break newBreakData }
    in
    ( newModel, printInstructionsAndExitIfAllSavesAreComplete newBreakData encouragementNumber )


confirmSaveDataFileWrite : BreakData -> Model -> ( Model, Cmd Action )
confirmSaveDataFileWrite ({ fileSaveStatus } as breakData) model =
    let
        newBreakData =
            { breakData | fileSaveStatus = { fileSaveStatus | saveDataSaved = True } }

        encouragementNumber =
            model.randomNumbers
                |> ListEx.last
                |> Maybe.withDefault 0

        newModel =
            { model | command = Break newBreakData }
    in
    ( newModel, printInstructionsAndExitIfAllSavesAreComplete newBreakData encouragementNumber )


printInstructionsAndExitIfAllSavesAreComplete : BreakData -> Int -> Cmd Action
printInstructionsAndExitIfAllSavesAreComplete { fileSaveStatus, breakCount, filepath } encouragementNumber =
    if Model.allSavesComplete fileSaveStatus then
        [ "...done!\n"
        , "Hint commands: "
        , "    `debug_trainer error-type-hint "
            ++ FilePath.toString filepath
            ++ "` # Running this command will tell you what type of "
            ++ pluralize breakCount "change"
            ++ " I made"
        , "    `debug_trainer line-hint "
            ++ FilePath.toString filepath
            ++ "` # Running this command will tell you what line the "
            ++ pluralize breakCount "change"
            ++ " "
            ++ pluralize breakCount "was"
            ++ " made on"
        , "Other commands: "
        , "    `debug_trainer explain " ++ FilePath.toString filepath ++ "` # Running this command will tell you exactly what I did"
        , "    `debug_trainer reset " ++ FilePath.toString filepath ++ "` # Running this command will reset the file back to the way it was"
        , "\n\nGood luck debugging! I believe in you! " ++ pickEncouragement encouragementNumber ++ " ❤️\n"
        ]
            |> Messages.list
            |> Ports.printAndExitSuccess

    else
        Cmd.none


pickEncouragement : Int -> String
pickEncouragement number =
    Utils.List.pickRandom number encouragements
        |> Maybe.withDefault defaultEncouragement


defaultEncouragement : String
defaultEncouragement =
    "I would make you an adorable yet encouraging cross-stitch, but I'm a computer and I don't have any arms."


encouragements : List String
encouragements =
    [ defaultEncouragement
    , "You can do it!"
    , "Don't forget to make your program print things out if you don't know what they are."
    ]


pluralize : Int -> String -> String
pluralize count string =
    PluralRules.En.pluralize rules count string


rules : Rules
rules =
    PluralRules.fromList
        [ ( "was"
          , [ ( One, "was" )
            , ( Other, "were" )
            ]
          )
        ]
