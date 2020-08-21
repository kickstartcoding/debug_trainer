module Commands.Explain.Cmd exposing (init, printExplanation)

import Actions exposing (Action)
import Model exposing (Command(..), Model)
import Model.SavedData exposing (SavedDataError(..))
import Ports
import Utils.Cmd as Cmd
import Utils.Messages as Messages
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FileData exposing (FileData)
import Utils.Types.FilePath exposing (FilePath)


init : FilePath -> Model -> Cmd Action
init filepath model =
    Cmd.fromFileData
        { filepath = filepath
        , model = model
        , dataPresentCmdFunc =
            \savedData fileData ->
                printExplanation fileData
        , dataAbsentCmd =
            Ports.printAndExitSuccess
                (Messages.noRecordOfChangeMessage filepath)
        }


printExplanation : FileData -> Cmd action
printExplanation fileData =
    fileData
        |> Messages.breakExplanation
        |> Ports.printAndExitSuccess
