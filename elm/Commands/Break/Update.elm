module Commands.Break.Update exposing (update)

import Commands.Break.Actions exposing (Action(..))
import Commands.Break.Update.BreakFile
import Model exposing (BreakData, Command(..), Model)
import Utils.Cmd as Cmd
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath


update : BreakData -> Action -> Model -> ( Model, Cmd Action )
update ({ breakCount, filepath, fileSaveStatus } as breakData) action model =
    case action of
        SuccessfulFileRead { content } ->
            Commands.Break.Update.BreakFile.run
                { breakCount = breakCount
                , filepath = filepath
                , fileSaveStatus = fileSaveStatus
                , fileContent = content
                , model = model
                }

        SuccessfulFileWrite { path } ->
            if FilePath.fromString path == filepath then
                confirmTargetFileWrite breakData model

            else
                confirmSaveDataFileWrite breakData model


confirmTargetFileWrite : BreakData -> Model -> ( Model, Cmd Action )
confirmTargetFileWrite ({ fileSaveStatus } as breakData) model =
    let
        newFileSaveStatus =
            { fileSaveStatus | targetFileSaved = True }

        newModel =
            { model | command = Break { breakData | fileSaveStatus = newFileSaveStatus } }
    in
    ( newModel, Cmd.exitIfAllSavesAreComplete newFileSaveStatus )


confirmSaveDataFileWrite : BreakData -> Model -> ( Model, Cmd Action )
confirmSaveDataFileWrite ({ fileSaveStatus } as breakData) model =
    let
        newFileSaveStatus =
            { fileSaveStatus | saveDataSaved = True }

        newModel =
            { model | command = Break { breakData | fileSaveStatus = newFileSaveStatus } }
    in
    ( newModel, Cmd.exitIfAllSavesAreComplete newFileSaveStatus )
