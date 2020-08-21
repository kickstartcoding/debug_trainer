module Utils.Messages exposing
    ( breakExplanation
    , errorTypeHint
    , lineNumberHint
    , list
    , noRecordOfChangeMessage
    , withNewlineBuffers
    )

import List.Extra as ListEx
import String.Extra as StrEx
import Utils.Types.BreakType as BreakType exposing (BreakType(..))
import Utils.Types.FileData exposing (ChangeData, FileData)
import Utils.Types.FilePath as FilePath exposing (FilePath)


breakExplanation : FileData -> String
breakExplanation { changes } =
    changes
        |> List.map
            (\{ changeDescription, lineNumber } ->
                changeDescription
                    ++ " on `line "
                    ++ String.fromInt lineNumber
                    ++ "` of the original file"
                    |> StrEx.toSentenceCase
                    |> withNewlineBuffers
            )
        |> String.join "\n\n"


lineNumberHint : FileData -> String
lineNumberHint { changes } =
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


errorTypeHint : FileData -> String
errorTypeHint { changes } =
    withNewlineBuffers <|
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
            "`" ++ String.fromInt moreThanOne ++ " times` in file: "


countOfType : BreakType -> List ChangeData -> Int
countOfType targetBreakType changeList =
    changeList
        |> List.filter (\{ breakType } -> breakType == targetBreakType)
        |> List.length


noRecordOfChangeMessage : FilePath -> String
noRecordOfChangeMessage filepath =
    "`debug_trainer` has no record of `"
        ++ FilePath.toString filepath
        ++ "` being changed. Either it has never been changed or the changes that were made have been reverted."
        |> withNewlineBuffers


list : List String -> String
list messages =
    String.join "\n\n" messages


withNewlineBuffers : String -> String
withNewlineBuffers string =
    "\n\n"
        ++ string
        ++ "\n\n"
