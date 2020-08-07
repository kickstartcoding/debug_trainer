module TestHelp exposing
    ( expectBreakResult
    , expectBreakResultWithExt
    , expectBreakToOutputOneOf
    , expectBreakWithExtToOutputOneOf
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


expectBreakResult : { input : String, output : String } -> Expect.Expectation
expectBreakResult { input, output } =
    expectBreakResultWithExt
        { extension = "example"
        , input = input
        , output = output
        }


expectBreakResultWithExt : { extension : String, input : String, output : String } -> Expect.Expectation
expectBreakResultWithExt { extension, input, output } =
    breakContent { filename = "filepath." ++ extension, content = input }
        |> Expect.equal output


expectBreakToOutputOneOf : { input : String, outputPossibilities : List String } -> Expect.Expectation
expectBreakToOutputOneOf { input, outputPossibilities } =
    expectBreakWithExtToOutputOneOf
        { extension = "example"
        , input = input
        , outputPossibilities = outputPossibilities
        }


expectBreakWithExtToOutputOneOf : { extension : String, input : String, outputPossibilities : List String } -> Expect.Expectation
expectBreakWithExtToOutputOneOf { extension, input, outputPossibilities } =
    breakContent { filename = "filepath." ++ extension, content = input }
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


breakContent : { filename : String, content : String } -> String
breakContent { filename, content } =
    let
        filepath =
            FilePath.fromString filename

        workingDirectory =
            "/directory/example"
    in
    BreakFile.run
        { breakCount = 1
        , filepath = filepath
        , fileSaveStatus = Model.initFileSaveStatus
        , fileContent = content
        , model =
            { randomNumbers = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
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
