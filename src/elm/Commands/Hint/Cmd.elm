module Commands.Hint.Cmd exposing (init)

import Actions exposing (Action)
import List.Extra as ListEx
import Model exposing (Command(..), HintType(..), Model)
import Model.SavedData exposing (ChangeData, FileData, SavedDataError(..))
import Ports
import Utils.Cmd as Cmd
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
                    "HINT: " ++ BreakType.toChangeDescription breakType

                changesList ->
                    BreakType.allBreakTypes
                        |> List.map (\breakType -> ( breakType, countOfType breakType changesList ))
                        |> List.filter (\( _, count ) -> count > 0)
                        |> List.map (\( breakType, count ) -> timesDescription count ++ BreakType.toChangeDescription breakType)
                        |> String.join "\n\n"


timesDescription : Int -> String
timesDescription integer =
    case integer of
        1 ->
            "`1 time` in file: "

        moreThanOne ->
           "`"++ String.fromInt moreThanOne ++ " times` in file: "


countOfType : BreakType -> List ChangeData -> Int
countOfType targetBreakType list =
    list
        |> List.filter (\{ breakType } -> breakType == targetBreakType)
        |> List.length


printLineNumberHint : FileData -> Cmd Action
printLineNumberHint { changes } =
    Ports.printAndExitSuccess <|
        case changes of
            [] ->
                "No changes were made to this file. Curious. Probably a bug."

            [ { lineNumber } ] ->
                "\n\n"
                    ++ "HINT: The line where the change was made was `line "
                    ++ String.fromInt lineNumber
                    ++ "` of the original file."
                    ++ "\n\n"

            changesList ->
                "\n\n"
                    ++ "HINT: Changes were made on these lines of the original file: `"
                    ++ (changesList
                            |> List.map .lineNumber
                            |> ListEx.unique
                            |> List.sort
                            |> List.map String.fromInt
                            |> String.join ", "
                       )
                    ++ "`\n\n"
