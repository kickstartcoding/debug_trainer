module Commands.Hint.Cmd exposing (init)

import Actions exposing (Action)
import Http exposing (Error)
import Model exposing (Command(..), HintType(..), Model)
import Model.SavedData exposing (ChangeData, FileData, SavedDataError(..))
import Ports
import Utils.Cmd as Cmd
import Utils.FileContent as FileContent
import Utils.Messages as Messages
import Utils.Types.BreakType as BreakType exposing (BreakType(..))
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
printErrorDescriptionHint { changes } =
    Ports.printAndExitSuccess <|
        Messages.withNewlineBuffers <|
            case changes of
                [] ->
                    "No changes were made to this file. Curious. Probably a bug."

                [ { breakType } ] ->
                    "HINT: " ++ changeDescriptionFromBreakType breakType

                changesList ->
                    BreakType.allBreakTypes
                        |> List.map (\breakType -> ( breakType, countOfType breakType changesList ))
                        |> List.filter (\( _, count ) -> count > 0)
                        |> List.map (\( breakType, count ) -> timesDescription count ++ changeDescriptionFromBreakType breakType)
                        |> String.join "\n\n"


timesDescription : Int -> String
timesDescription integer =
    case integer of
        1 ->
            "1 time in file: "

        moreThanOne ->
            String.fromInt moreThanOne ++ " times in file: "


countOfType : BreakType -> List ChangeData -> Int
countOfType targetBreakType list =
    list
        |> List.filter (\{ breakType } -> breakType == targetBreakType)
        |> List.length


changeDescriptionFromBreakType : BreakType -> String
changeDescriptionFromBreakType breakType =
    case breakType of
        CaseSwap ->
            "Somewhere in this file, debug_trainer changed a word from "
                ++ "starting with a capital letter to starting with "
                ++ "a lowercase letter or vice versa."

        RemoveReturn ->
            "Somewhere in this file, debug_trainer removed "
                ++ "a `return` keyword from a function."

        RemoveParenthesis ->
            "Somewhere in this file, debug_trainer removed "
                ++ "an opening or closing parenthesis or bracket."

        ChangeFunctionArgs ->
            "Somewhere in this file, debug_trainer changed "
                ++ "the arguments to a function."


printLineNumberHint : FileData -> Cmd Action
printLineNumberHint { changes } =
    Ports.printAndExitSuccess <|
        case changes of
            [] ->
                "No changes were made to this file. Curious. Probably a bug."

            [ { lineNumber } ] ->
                "\n\n"
                    ++ "HINT: The line where the change was made was line "
                    ++ String.fromInt lineNumber
                    ++ " of the original file."
                    ++ "\n\n"

            changesList ->
                "\n\n"
                    ++ "HINT: Changes were made on these lines of the original file: "
                    ++ (changesList
                            |> List.map (.lineNumber >> String.fromInt)
                            |> String.join ", "
                       )
                    ++ "\n\n"
