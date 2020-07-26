module Commands.Break.Update.BreakFile exposing (run)

import Breakers.CaseSwap as CaseSwap
import Breakers.ChangeFunctionArgs as ChangeFunctionArgs
import Breakers.RemoveParenthesis as RemoveParenthesis
import Breakers.RemoveReturn as RemoveReturn
import Breakers.Utils
import Commands.Break.Actions exposing (Action(..))
import Model exposing (Command(..), FileSaveStatus, Model)
import Model.SavedData as SavedData
import Parsers.Generic.Parser as GenericParser
import Parsers.Generic.Segment exposing (Segment)
import Ports
import Utils.List
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


run : FilePath -> FileSaveStatus -> String -> Model -> ( Model, Cmd Action )
run filepath fileSaveStatus fileContent model =
    let
        maybeChange =
            case GenericParser.run fileContent of
                Ok segments ->
                    let
                        maybeBreakType =
                            chooseBreakType segments model.randomNumbers

                        breakRunnerData =
                            { randomNumber = model.randomNumbers.segmentToBreakInt
                            , originalFileContent = fileContent
                            , segments = segments
                            }
                    in
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

                Err _ ->
                    Nothing
    in
    case maybeChange of
        Just newFileData ->
            let
                oldSavedData =
                    SavedData.savedDataOrInit model.savedDataResult

                newSavedData =
                    SavedData.setFileData
                        { filepath = filepath
                        , workingDirectory = model.workingDirectory
                        , fileData = newFileData
                        }
                        oldSavedData
            in
            ( { model | command = Break filepath fileSaveStatus }
            , Cmd.batch
                [ Ports.writeFile
                    { path = FilePath.toString filepath
                    , content = newFileData.updatedContent
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


chooseBreakType : List Segment -> { breakTypeInt : Int, segmentToBreakInt : Int } -> Maybe BreakType
chooseBreakType segments { breakTypeInt } =
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
