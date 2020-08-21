module Commands.Hint.Cmd exposing (init, printErrorDescriptionHint, printLineNumberHint)

import Actions exposing (Action)
import List.Extra as ListEx
import Model exposing (Command(..), HintType(..), Model)
import Model.SavedData exposing (SavedDataError(..))
import Ports
import Utils.Cmd as Cmd
import Utils.Messages as Messages
import Utils.Types.BreakType as BreakType exposing (BreakType(..))
import Utils.Types.FileData exposing (ChangeData, FileData)
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


printHint : FileData -> HintType -> Cmd action
printHint fileData hintType =
    case hintType of
        ErrorDescription ->
            printErrorDescriptionHint fileData

        LineNumber ->
            printLineNumberHint fileData


printErrorDescriptionHint : FileData -> Cmd action
printErrorDescriptionHint fileData =
    Ports.printAndExitSuccess <| Messages.errorTypeHint fileData


printLineNumberHint : FileData -> Cmd action
printLineNumberHint fileData =
    Ports.printAndExitSuccess <| Messages.lineNumberHint fileData
