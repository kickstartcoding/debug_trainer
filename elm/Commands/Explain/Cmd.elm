module Commands.Explain.Cmd exposing (init)

import Actions exposing (Action)
import Model exposing (Command(..), Model)
import Model.SavedData exposing (SavedDataError(..))
import Ports
import Utils.Cmd as Cmd
import Utils.Messages as Messages
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath exposing (FilePath)


init : FilePath -> Model -> Cmd Action
init filepath model =
    Cmd.fromFileData
        { filepath = filepath
        , model = model
        , dataPresentCmdFunc =
            \savedData { changes } ->
                changes
                    |> List.map (\{ changeDescription, lineNumber } -> changeDescription ++ " on `line " ++ String.fromInt lineNumber ++ "` of the original file")
                    |> String.join "\n\n"
                    |> Ports.printAndExitSuccess
        , dataAbsentCmd =
            Ports.printAndExitSuccess
                (Messages.noRecordOfChangeMessage filepath)
        }
