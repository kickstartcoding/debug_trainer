module Elm.TestHelp exposing
    ( expectBreakResult
    , expectBreakResultWithExt
    , expectBreakToOutputOneOf
    , expectBreakWithExtToOutputOneOf
    , expectMultiBreakResult
    , expectMultiBreakResultWithExt
    , expectMultiBreakToOutputOneOf
    , expectMultiBreakWithExtToOutputOneOf
    , expectResult
    )

import Commands.Break.Update.BreakFile as BreakFile
import Dict
import Expect
import Model
import Model.SavedData as SavedData
import Utils.Types.FilePath as FilePath


expectResult : (String -> Result errorType dataType) -> String -> dataType -> Expect.Expectation
expectResult parseFunc source expected =
    case parseFunc source of
        Err deadEnds ->
            let
                _ =
                    Debug.log "Unexpected result" deadEnds
            in
            Expect.fail "Expecting success but got Err."

        Ok validResult ->
            Expect.equal validResult expected


expectBreakResult : { input : String, output : String, randomNumbers : List Int } -> Expect.Expectation
expectBreakResult { input, output, randomNumbers } =
    expectBreakResultWithExt
        { extension = "example"
        , input = input
        , output = output
        , randomNumbers = randomNumbers
        }


expectMultiBreakResult : { input : String, output : String, breakCount : Int, randomNumbers : List Int } -> Expect.Expectation
expectMultiBreakResult { input, output, breakCount, randomNumbers } =
    expectMultiBreakResultWithExt
        { extension = "example"
        , input = input
        , output = output
        , randomNumbers = randomNumbers
        , breakCount = breakCount
        }


expectBreakResultWithExt : { extension : String, input : String, output : String, randomNumbers : List Int } -> Expect.Expectation
expectBreakResultWithExt { extension, input, output, randomNumbers } =
    expectMultiBreakResultWithExt
        { extension = extension
        , input = input
        , output = output
        , breakCount = 1
        , randomNumbers = randomNumbers
        }


expectMultiBreakResultWithExt : { extension : String, input : String, output : String, breakCount : Int, randomNumbers : List Int } -> Expect.Expectation
expectMultiBreakResultWithExt { extension, input, output, breakCount, randomNumbers } =
    breakContent { filename = "filepath." ++ extension, content = input, breakCount = breakCount, randomNumbers = randomNumbers }
        |> Expect.equal output


expectBreakToOutputOneOf : { input : String, outputPossibilities : List String, randomNumbers : List Int } -> Expect.Expectation
expectBreakToOutputOneOf { input, outputPossibilities, randomNumbers } =
    expectBreakWithExtToOutputOneOf
        { extension = "example"
        , input = input
        , outputPossibilities = outputPossibilities
        , randomNumbers = randomNumbers
        }


expectMultiBreakToOutputOneOf : { input : String, outputPossibilities : List String, breakCount : Int, randomNumbers : List Int } -> Expect.Expectation
expectMultiBreakToOutputOneOf { input, outputPossibilities, breakCount, randomNumbers } =
    expectMultiBreakWithExtToOutputOneOf
        { extension = "example"
        , input = input
        , outputPossibilities = outputPossibilities
        , breakCount = breakCount
        , randomNumbers = randomNumbers
        }


expectBreakWithExtToOutputOneOf : { extension : String, input : String, outputPossibilities : List String, randomNumbers : List Int } -> Expect.Expectation
expectBreakWithExtToOutputOneOf { extension, input, outputPossibilities, randomNumbers } =
    expectMultiBreakWithExtToOutputOneOf
        { extension = extension
        , input = input
        , outputPossibilities = outputPossibilities
        , breakCount = 1
        , randomNumbers = randomNumbers
        }


expectMultiBreakWithExtToOutputOneOf : { extension : String, input : String, outputPossibilities : List String, breakCount : Int, randomNumbers : List Int } -> Expect.Expectation
expectMultiBreakWithExtToOutputOneOf { extension, input, outputPossibilities, breakCount, randomNumbers } =
    breakContent { filename = "filepath." ++ extension, content = input, breakCount = breakCount, randomNumbers = randomNumbers }
        |> (\content ->
                if List.member content outputPossibilities then
                    True

                else
                    let
                        _ =
                            Debug.log "Bad updated content" content
                    in
                    False
           )
        |> Expect.equal True


breakContent : { filename : String, content : String, breakCount : Int, randomNumbers : List Int } -> String
breakContent { filename, content, breakCount, randomNumbers } =
    let
        filepath =
            FilePath.fromString filename

        workingDirectory =
            "/directory/example"
    in
    BreakFile.run
        { breakCount = breakCount
        , filepath = filepath
        , fileSaveStatus = Model.initFileSaveStatus
        , fileContent = content
        , model =
            { randomNumbers = randomNumbers
            , dataFilePath = filepath
            , workingDirectory = workingDirectory
            , savedDataResult = Ok SavedData.init
            , command =
                Model.breakInit (Just "1") filename False False
                    |> .command
            }
        }
        |> Tuple.first
        |> .savedDataResult
        |> Result.withDefault { changedFiles = Dict.fromList [] }
        |> .changedFiles
        |> Dict.get (workingDirectory ++ "/" ++ filename)
        |> Maybe.withDefault
            { originalContent = "nothing found in changedFiles dict"
            , updatedContent = "nothing found in changedFiles dict"
            , changes = []
            }
        |> .updatedContent
