module Commands.Reset.Update exposing (update)

import Commands.Reset.Actions exposing (Action(..))
import Model exposing (Command(..), FileSaveStatus, Model)
import Utils.Cmd as Cmd
import Utils.Messages as Messages
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


update : FilePath -> FileSaveStatus -> Action -> Model -> ( Model, Cmd Action )
update targetFilepath fileSaveStatus action model =
    case action of
        SuccessfulFileWrite { path } ->
            if FilePath.fromString path == targetFilepath then
                confirmTargetFileWrite targetFilepath fileSaveStatus model

            else
                confirmSaveDataFileWrite targetFilepath fileSaveStatus model


confirmTargetFileWrite : FilePath -> FileSaveStatus -> Model -> ( Model, Cmd Action )
confirmTargetFileWrite targetFilepath fileSaveStatus model =
    let
        newFileSaveStatus =
            { fileSaveStatus | targetFileSaved = True }

        newModel =
            { model | command = Reset targetFilepath newFileSaveStatus }
    in
    ( newModel, Cmd.printAndExitIfAllSavesAreComplete (resetCompleteMessage targetFilepath) newFileSaveStatus )


confirmSaveDataFileWrite : FilePath -> FileSaveStatus -> Model -> ( Model, Cmd Action )
confirmSaveDataFileWrite targetFilepath fileSaveStatus model =
    let
        newFileSaveStatus =
            { fileSaveStatus | saveDataSaved = True }

        newModel =
            { model | command = Reset targetFilepath newFileSaveStatus }
    in
    ( newModel, Cmd.printAndExitIfAllSavesAreComplete (resetCompleteMessage targetFilepath) newFileSaveStatus )


resetCompleteMessage : FilePath -> String
resetCompleteMessage filepath =
    Messages.withNewlineBuffers <|
        "`"
            ++ FilePath.toString filepath
            ++ "` has been reset!"
