module Commands.Hint.Cmd exposing (init)

import Actions exposing (Action)
import Http exposing (Error)
import Model exposing (Command(..), HintType(..), Model)
import Model.SavedData exposing (FileData, SavedDataError(..))
import Ports
import Utils.Cmd as Cmd
import Utils.FileContent as FileContent
import Utils.Messages as Messages
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath exposing (FilePath)


init : FilePath -> HintType -> Model -> Cmd Action
init filepath hintType model =
    Cmd.fromFileData
        { filepath = filepath
        , model = model
        , dataPresentCmdFunc = \_ fileData -> printHint fileData hintType
        , dataAbsentCmd =
            Ports.printAndExitSuccess
                (Messages.noRecordOfChangeMessage filepath)
        }


printHint : FileData -> HintType -> Cmd Action
printHint fileData hintType =
    case hintType of
        ErrorDescription ->
            printErrorDescriptionHint fileData

        LineNumber ->
            printLineNumberHint fileData


printErrorDescriptionHint : FileData -> Cmd Action
printErrorDescriptionHint { breakType } =
    case breakType of
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

        RemoveParenthesis ->
            Ports.printAndExitSuccess
                ("\n\n"
                    ++ "HINT: Somewhere in this file, debug_trainer removed "
                    ++ "an opening or closing parenthesis or bracket."
                    ++ "\n\n"
                )

        ChangeFunctionArgs ->
            Ports.printAndExitSuccess
                ("\n\n"
                    ++ "HINT: Somewhere in this file, debug_trainer changed "
                    ++ "the arguments to a function."
                    ++ "\n\n"
                )


printLineNumberHint : FileData -> Cmd Action
printLineNumberHint { lineNumber } =
    Ports.printAndExitSuccess
        ("\n\n"
            ++ "HINT: The line where the change was made was line "
            ++ String.fromInt lineNumber
            ++ " of the original file."
            ++ "\n\n"
        )
