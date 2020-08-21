module Commands.Break.Update.BreakFile exposing (run)

import Breakers.Utils
import Commands.Break.Actions exposing (Action(..))
import Model exposing (Command(..), Model)
import Model.SavedData exposing (ChangeData)
import Parsers.Generic.Parser as GenericParser
import Parsers.Generic.Segment exposing (Segment)
import Parsers.Generic.SegmentList as SegmentList
import Utils.List
import Utils.Types.BreakType as BreakType exposing (BreakType(..))
import Utils.Types.FilePath exposing (FilePath)
import Utils.Types.FileType as FileType


run :
    { breakCount : Int
    , filepath : FilePath
    , fileContent : String
    , randomNumbers : List Int
    }
    -> Maybe { newFileContent : String, changes : List ChangeData }
run ({ filepath, fileContent } as config) =
    (case GenericParser.run (FileType.fromFilePath filepath) fileContent of
        Ok segments ->
            Just (buildChanges config segments [])

        Err _ ->
            Nothing
    )
        |> Maybe.map
            (\( newSegments, changes ) ->
                let
                    newFileContent =
                        newSegments |> Breakers.Utils.segmentsToContent
                in
                { newFileContent = newFileContent, changes = changes }
            )


buildChanges :
    { breakCount : Int
    , filepath : FilePath
    , fileContent : String
    , randomNumbers : List Int
    }
    -> List Segment
    -> List ChangeData
    -> ( List Segment, List ChangeData )
buildChanges config segments changes =
    let
        ( breakTypeChoiceSeed, segmentChoiceSeed ) =
            getSeeds config.breakCount config.randomNumbers

        maybeBreakType =
            chooseBreakType segments breakTypeChoiceSeed

        breakRunnerData =
            { randomNumber = segmentChoiceSeed
            , originalFileContent = config.fileContent
            , segments = segments
            , fileType = FileType.fromFilePath config.filepath
            }

        maybeChange =
            SegmentList.makeAChange maybeBreakType breakRunnerData
    in
    case maybeChange of
        Just ( newSegments, change ) ->
            if config.breakCount == 1 then
                ( newSegments, change :: changes )

            else
                buildChanges { config | breakCount = config.breakCount - 1 }
                    newSegments
                    (change :: changes)

        Nothing ->
            ( segments, changes )


getSeeds : Int -> List Int -> ( Int, Int )
getSeeds breakCount randomNumberList =
    case List.drop (breakCount * 2) randomNumberList of
        num1 :: num2 :: _ ->
            ( num1, num2 )

        _ ->
            ( 0, 0 )


chooseBreakType : List Segment -> Int -> Maybe BreakType
chooseBreakType segments breakTypeInt =
    let
        viableBreakTypePossibilities =
            BreakType.allBreakTypes
                |> List.map
                    (\breakType ->
                        ( breakType, SegmentList.countForBreakType breakType segments )
                    )
                |> List.filter (\( _, count ) -> count > 0)

        totalCandidateCount =
            List.foldl (Tuple.second >> (+)) 0 viableBreakTypePossibilities

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
