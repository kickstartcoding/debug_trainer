module Commands.Hint.Cmd exposing (init)

import Actions exposing (Action)
import Model exposing (Command(..), Model)
import Model.SavedData as SavedData exposing (FileData, SavedDataError(..))
import Ports
import Utils.Cmd
import Utils.FileContent as FileContent
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath exposing (FilePath)


init : FilePath -> Int -> Model -> Cmd Action
init filepath hintNumber model =
    Utils.Cmd.fromFileData filepath
        model
        (\_ fileData ->
            printHint fileData hintNumber
        )


printHint : FileData -> Int -> Cmd Action
printHint fileData hintNumber =
    case hintNumber of
        1 ->
            printFirstHint fileData

        2 ->
            printSecondHint fileData

        otherHintNumber ->
            Ports.printAndExitSuccess
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
