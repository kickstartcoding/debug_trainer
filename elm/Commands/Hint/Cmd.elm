module Commands.Hint.Cmd exposing (init)

import Actions exposing (Action)
import Model exposing (Command(..), Model)
import Model.SavedData as SavedData exposing (FileData, SavedDataError(..))
import Ports
import Utils.FileContent as FileContent
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


init : FilePath -> Int -> Model -> Cmd Action
init filepath hintNumber { savedDataResult, dataFilePath, workingDirectory } =
    case savedDataResult of
        Ok data ->
            case
                SavedData.getFileData
                    { filepath = filepath
                    , workingDirectory = workingDirectory
                    }
                    data
            of
                Just fileData ->
                    printHint fileData hintNumber

                Nothing ->
                    Ports.printAndExitSuccess
                        (noRecordOfChangeMessage filepath)

        Err FileMissing ->
            Ports.printAndExitSuccess
                (noRecordOfChangeMessage filepath)

        Err error ->
            error
                |> SavedData.errorMessage dataFilePath
                |> Ports.printAndExitFailure


noRecordOfChangeMessage : FilePath -> String
noRecordOfChangeMessage filepath =
    "\n\n"
        ++ "debug_trainer has no record of "
        ++ FilePath.toString filepath
        ++ " being changed. Either it has never been changed or the changes that were made have been reverted"
        ++ "\n\n"


printHint : FileData -> Int -> Cmd Action
printHint fileData hintNumber =
    case hintNumber of
        1 ->
            printFirstHint fileData

        2 ->
            printSecondHint fileData

        otherHintNumber ->
            Ports.printAndExitFailure
                ("\n\n"
                    ++ "You asked for hint number "
                    ++ String.fromInt otherHintNumber
                    ++ ", but you have to choose either hint "
                    ++ "1 or 2."
                    ++ "\n\n"
                )


printFirstHint : FileData -> Cmd Action
printFirstHint { change } =
    case change.breakType of
        CaseSwap ->
            Ports.printAndExitSuccess
                ("\n\n"
                    ++ "HINT: Somewhere in this file, debug_trainer changed a word from "
                    ++ "starting with a capital letter to starting with "
                    ++ "a lowercase letter or vice versa."
                    ++ "\n\n"
                )

        RemoveReturn ->
            Ports.printAndExitSuccess
                ("\n\n"
                    ++ "HINT: Somewhere in this file, debug_trainer removed "
                    ++ "a `return` keyword from a function."
                    ++ "\n\n"
                )

        ChangeFunctionArgs ->
            Ports.printAndExitSuccess
                ("\n\n"
                    ++ "HINT: Somewhere in this file, debug_trainer changed "
                    ++ "the arguments to a function."
                    ++ "\n\n"
                )


printSecondHint : FileData -> Cmd Action
printSecondHint { change, originalContent } =
    let
        lineOfChange =
            FileContent.rowFromOffset
                change.replacementData.originalContent.start
                originalContent
    in
    Ports.printAndExitSuccess
        ("\n\n"
            ++ "HINT: The line where the change was made was line "
            ++ String.fromInt lineOfChange
            ++ " of the original file."
            ++ "\n\n"
        )
