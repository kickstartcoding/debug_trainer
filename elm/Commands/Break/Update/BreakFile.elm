module Commands.Break.Update.BreakFile exposing (run)

import Breakers.CaseSwap as CaseSwap
import Breakers.ChangeFunctionArgs as ChangeFunctionArgs
import Breakers.RemoveParenthesis as RemoveParenthesis
import Breakers.RemoveReturn as RemoveReturn
import Breakers.Utils
import Commands.Break.Actions exposing (Action(..))
import Model exposing (Command(..), FileSaveStatus, Model)
import Model.SavedData as SavedData exposing (ChangeData)
import Parsers.Generic.Parser as GenericParser
import Parsers.Generic.Segment exposing (Segment)
import Ports
import Utils.List
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


run :
    { breakCount : Int
    , filepath : FilePath
    , fileSaveStatus : FileSaveStatus
    , fileContent : String
    , model : Model
    }
    -> ( Model, Cmd Action )
run ({ breakCount, filepath, fileSaveStatus, fileContent, model } as config) =
    let
        maybeChanges =
            case GenericParser.run fileContent of
                Ok segments ->
                    Just (buildChanges config segments [])

                Err _ ->
                    Nothing
    in
    case maybeChanges of
        Just ( newSegments, changes ) ->
            let
                oldSavedData =
                    SavedData.savedDataOrInit model.savedDataResult

                newFileContent =
                    newSegments |> Breakers.Utils.segmentsToContent

                newSavedData =
                    SavedData.setFileData
                        { filepath = filepath
                        , workingDirectory = model.workingDirectory
                        , fileData =
                            { originalContent = fileContent
                            , updatedContent = newFileContent
                            , changes = changes
                            }
                        }
                        oldSavedData
            in
            ( { model
                | command =
                    Break
                        { breakCount = breakCount
                        , filepath = filepath
                        , fileSaveStatus = fileSaveStatus
                        }
              }
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


buildChanges :
    { breakCount : Int
    , filepath : FilePath
    , fileSaveStatus : FileSaveStatus
    , fileContent : String
    , model : Model
    }
    -> List Segment
    -> List ChangeData
    -> ( List Segment, List ChangeData )
buildChanges config segments changes =
    let
        ( breakTypeChoiceSeed, segmentChoiceSeed ) =
            case List.drop (config.breakCount * 2) config.model.randomNumbers of
                num1 :: num2 :: _ ->
                    ( num1, num2 )

                _ ->
                    ( 0, 0 )

        maybeBreakType =
            chooseBreakType segments breakTypeChoiceSeed

        breakRunnerData =
            { randomNumber = segmentChoiceSeed
            , originalFileContent = config.fileContent
            , segments = segments
            }

        maybeChanges =
            case maybeBreakType of
                Just CaseSwap ->
                    CaseSwap.run breakRunnerData

                Just RemoveReturn ->
                    RemoveReturn.run breakRunnerData

                Just RemoveParenthesis ->
                    RemoveParenthesis.run breakRunnerData

                Just ChangeFunctionArgs ->
                    ChangeFunctionArgs.run breakRunnerData

                _ ->
                    Nothing
    in
    case maybeChanges of
        Just ( newSegments, change ) ->
            if config.breakCount == 1 then
                ( newSegments, change :: changes )

            else
                buildChanges { config | breakCount = config.breakCount - 1 }
                    newSegments
                    (change :: changes)

        Nothing ->
            ( segments, changes )


chooseBreakType : List Segment -> Int -> Maybe BreakType
chooseBreakType segments breakTypeInt =
    let
        caseSwapCandidateCount =
            segments
                |> Breakers.Utils.candidates CaseSwap.validCandidateData
                |> List.length

        returnStatementCandidateCount =
            segments
                |> Breakers.Utils.candidates RemoveReturn.validCandidateData
                |> List.length

        parenthesisCandidateCount =
            segments
                |> Breakers.Utils.candidates RemoveParenthesis.validCandidateData
                |> List.length

        functionDeclarationCandidateCount =
            segments
                |> Breakers.Utils.candidates ChangeFunctionArgs.validCandidateData
                |> List.length

        totalCandidateCount =
            caseSwapCandidateCount
                + returnStatementCandidateCount
                + parenthesisCandidateCount
                + functionDeclarationCandidateCount

        viableBreakTypePossibilities =
            [ ( CaseSwap, caseSwapCandidateCount )
            , ( RemoveReturn, returnStatementCandidateCount )
            , ( RemoveParenthesis, parenthesisCandidateCount )
            , ( ChangeFunctionArgs, functionDeclarationCandidateCount )
            ]
                |> List.filter (\( _, count ) -> count > 0)

        totalViableBreakTypes =
            List.length viableBreakTypePossibilities

        breakTypeProbabilities =
            viableBreakTypePossibilities
                |> List.map
                    (\( breakType, count ) ->
                        ( breakType
                        , determineChoiceProbability
                            { breakTypeCount = totalViableBreakTypes
                            , breakOpportunityCount = count
                            , totalBreakOpportunities = totalCandidateCount
                            }
                        )
                    )
    in
    breakTypeProbabilities
        |> List.concatMap
            (\( breakType, breakPercent ) ->
                List.repeat breakPercent breakType
            )
        |> Utils.List.pickRandom breakTypeInt


{-| determineChoiceProbability

    Averages the percentage of break types with the percentage of
    opportunities in the file to make an incident of each break type

-}
determineChoiceProbability : { breakTypeCount : Int, breakOpportunityCount : Int, totalBreakOpportunities : Int } -> Int
determineChoiceProbability { breakTypeCount, breakOpportunityCount, totalBreakOpportunities } =
    ((toFloat breakOpportunityCount / toFloat totalBreakOpportunities)
        + (1.0 / toFloat breakTypeCount)
    )
        / 2.0
        |> (*) 100
        |> round
