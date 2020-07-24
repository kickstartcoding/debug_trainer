module Commands.Break.Update exposing (update)

import Commands.Break.Actions exposing (Action(..))
import Commands.Break.Update.BreakFile
import Model exposing (Command(..), FileSaveStatus, Model)
import Utils.Cmd as Cmd
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


update : FilePath -> FileSaveStatus -> Action -> Model -> ( Model, Cmd Action )
update targetFilepath fileSaveStatus action model =
    case action of
        SuccessfulFileRead { content } ->
            Commands.Break.Update.BreakFile.run targetFilepath fileSaveStatus content model

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
            { model | command = Break targetFilepath newFileSaveStatus }
    in
    ( newModel, Cmd.exitIfAllSavesAreComplete newFileSaveStatus )


confirmSaveDataFileWrite : FilePath -> FileSaveStatus -> Model -> ( Model, Cmd Action )
confirmSaveDataFileWrite targetFilepath fileSaveStatus model =
    let
        newFileSaveStatus =
            { fileSaveStatus | saveDataSaved = True }

        newModel =
            { model | command = Break targetFilepath newFileSaveStatus }
    in
    ( newModel, Cmd.exitIfAllSavesAreComplete newFileSaveStatus )
