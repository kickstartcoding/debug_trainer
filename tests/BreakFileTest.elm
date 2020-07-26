module BreakFileTest exposing (..)

import Commands.Break.Update.BreakFile as BreakFile
import Dict
import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Model
import Model.SavedData as SavedData exposing (SavedData)
import Parser exposing (DeadEnd)
import Parsers.Generic.Segment exposing (BreakStatus(..), SegmentType(..))
import Test exposing (..)
import TestHelp
import Utils.Types.FilePath as FilePath exposing (FilePath)


suite : Test
suite =
    describe "Parsers.Generic.Parser.run"
        [ test "detects words" <|
            \_ ->
                expectBreakToOutputOneOf "thing1.thing2.thing3"
                    [ "thing1.thing2", "thing1.thing3", "thing2.thing3" ]
        ]


expectBreakToOutputOneOf : String -> List String -> Expect.Expectation
expectBreakToOutputOneOf startingFileContent validUpdatedFileContentList =
    let
        filepathString =
            "filepath.example"

        filepath =
            FilePath.fromString filepathString

        workingDirectory =
            "/directory/example"
    in
    Expect.equal
        (BreakFile.run
            { breakCount = 1
            , filepath = filepath
            , fileSaveStatus = Model.initFileSaveStatus
            , fileContent = startingFileContent
            , model =
                { randomNumbers = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
                , dataFilePath = filepath
                , workingDirectory = workingDirectory
                , savedDataResult = Ok SavedData.init
                , command =
                    Model.breakInit (Just "1") filepathString False False
                        |> .command
                }
            }
            |> Tuple.first
            |> .savedDataResult
            |> Result.withDefault { changedFiles = Dict.fromList [] }
            |> .changedFiles
            |> Dict.get (workingDirectory ++ "/" ++ filepathString)
            |> Maybe.withDefault
                { originalContent = "nothing found in changedFiles dict"
                , updatedContent = "nothing found in changedFiles dict"
                , changes = []
                }
            |> .updatedContent
            |> (\content ->
                    if List.member content validUpdatedFileContentList then
                        let
                            _ =
                                Debug.log "Good updated content" content
                        in
                        True

                    else
                        let
                            _ =
                                Debug.log "Bad updated content" content
                        in
                        False
               )
        )
        True
