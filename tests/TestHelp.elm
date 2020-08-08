module TestHelp exposing
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


expectBreakResult : { input : String, output : String } -> Expect.Expectation
expectBreakResult { input, output } =
    expectBreakResultWithExt
        { extension = "example"
        , input = input
        , output = output
        }


expectMultiBreakResult : { input : String, output : String, breakCount : Int } -> Expect.Expectation
expectMultiBreakResult { input, output, breakCount } =
    expectMultiBreakResultWithExt
        { extension = "example"
        , input = input
        , output = output
        , breakCount = breakCount
        }


expectBreakResultWithExt : { extension : String, input : String, output : String } -> Expect.Expectation
expectBreakResultWithExt { extension, input, output } =
    expectMultiBreakResultWithExt
        { extension = extension
        , input = input
        , output = output
        , breakCount = 1
        }


expectMultiBreakResultWithExt : { extension : String, input : String, output : String, breakCount : Int } -> Expect.Expectation
expectMultiBreakResultWithExt { extension, input, output, breakCount } =
    breakContent { filename = "filepath." ++ extension, content = input, breakCount = breakCount }
        |> Expect.equal output


expectBreakToOutputOneOf : { input : String, outputPossibilities : List String } -> Expect.Expectation
expectBreakToOutputOneOf { input, outputPossibilities } =
    expectBreakWithExtToOutputOneOf
        { extension = "example"
        , input = input
        , outputPossibilities = outputPossibilities
        }


expectMultiBreakToOutputOneOf : { input : String, outputPossibilities : List String, breakCount : Int } -> Expect.Expectation
expectMultiBreakToOutputOneOf { input, outputPossibilities, breakCount } =
    expectMultiBreakWithExtToOutputOneOf
        { extension = "example"
        , input = input
        , outputPossibilities = outputPossibilities
        , breakCount = breakCount
        }


expectBreakWithExtToOutputOneOf : { extension : String, input : String, outputPossibilities : List String } -> Expect.Expectation
expectBreakWithExtToOutputOneOf { extension, input, outputPossibilities } =
    expectMultiBreakWithExtToOutputOneOf
        { extension = extension
        , input = input
        , outputPossibilities = outputPossibilities
        , breakCount = 1
        }


expectMultiBreakWithExtToOutputOneOf : { extension : String, input : String, outputPossibilities : List String, breakCount : Int } -> Expect.Expectation
expectMultiBreakWithExtToOutputOneOf { extension, input, outputPossibilities, breakCount } =
    breakContent { filename = "filepath." ++ extension, content = input, breakCount = breakCount }
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


breakContent : { filename : String, content : String, breakCount : Int } -> String
breakContent { filename, content, breakCount } =
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
