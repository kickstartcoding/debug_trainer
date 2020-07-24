module Commands.Break.Update exposing (update)

import Breakers.CaseSwap as CaseSwap
import Breakers.ChangeFunctionArgs as ChangeFunctionArgs
import Breakers.RemoveReturn as RemoveReturn
import Breakers.Utils
import Commands.Break.Actions exposing (Action(..))
import Model exposing (CliOptions, Command(..), Model)
import Model.SavedData as SavedData
import Parsers.Generic.Parser as GenericParser
import Parsers.Generic.Segment exposing (Segment)
import Ports
import Utils.List
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


update : FilePath -> Action -> Model -> ( Model, Cmd Action )
update filepath action model =
    case action of
        ReceiveFileContents contents ->
            let
                maybeChange =
                    case GenericParser.run contents of
                        Ok segments ->
                            let
                                maybeBreakType =
                                    chooseBreakType segments model.randomNumbers
                            in
                            case maybeBreakType of
                                Just CaseSwap ->
                                    CaseSwap.run model.randomNumbers.segmentToBreakInt segments

                                Just RemoveReturn ->
                                    RemoveReturn.run model.randomNumbers.segmentToBreakInt segments

                                Just ChangeFunctionArgs ->
                                    ChangeFunctionArgs.run model.randomNumbers.segmentToBreakInt segments

                                _ ->
                                    Nothing

                        Err error ->
                            Nothing
            in
            case maybeChange of
                Just ( newContents, replacementData ) ->
                    let
                        oldSavedData =
                            SavedData.savedDataOrInit model.savedDataResult

                        newSavedData =
                            SavedData.setChange
                                { filepath = filepath
                                , workingDirectory = model.workingDirectory
                                , fileContent = contents
                                , change = replacementData
                                }
                                oldSavedData
                    in
                    ( { model | command = Break filepath }
                    , Ports.writeFileWith
                        { path = filepath
                        , contents = newContents
                        , dataToSave = newSavedData
                        }
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

        functionDeclarationCandidateCount =
            segments
                |> Breakers.Utils.candidates ChangeFunctionArgs.validCandidateData
                |> List.length

        totalCandidateCount =
            caseSwapCandidateCount + returnStatementCandidateCount + functionDeclarationCandidateCount

        viableBreakTypePossibilities =
            [ ( CaseSwap, caseSwapCandidateCount )
            , ( RemoveReturn, returnStatementCandidateCount )
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