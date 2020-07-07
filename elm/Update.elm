module Update exposing (update)

import Actions exposing (Action(..))
import Breakers.CaseSwap
import Codec
import Json.Encode as Encode
import Model exposing (Command(..), Model, Phase(..))
import Ports
import SavedData.Model as SavedData
import Utils.Types.FilePath as FilePath exposing (FilePath)


update : Command -> Action -> Model -> ( Model, Cmd Action )
update command action model =
    case command of
        Break filepath _ ->
            updateBreak filepath action model

        Hint _ _ ->
            ( model, Cmd.none )


updateBreak : FilePath -> Action -> Model -> ( Model, Cmd Action )
updateBreak filepath action model =
    case action of
        ReceiveFileContents contents ->
            let
                maybeChange =
                    contents
                        |> Breakers.CaseSwap.run model.randomNumber
            in
            case maybeChange of
                Just ( newContents, changeData ) ->
                    let
                        oldSavedData =
                            SavedData.savedDataOrInit model.savedDataResult

                        newSavedData =
                            SavedData.setChange
                                { filepath = filepath
                                , fileContent = contents
                                , change = SavedData.CaseSwap changeData
                                }
                                oldSavedData

                        writeFileData =
                            Encode.object
                                [ ( "path", FilePath.encode filepath )
                                , ( "contents", Encode.string newContents )
                                , ( "dataToSave", SavedData.encode newSavedData )
                                ]
                    in
                    ( { model | command = Break filepath WritingFile }
                    , Ports.writeFile writeFileData
                    )

                Nothing ->
                    ( model
                    , Ports.printAndExitFailure "Error: unable to find a good way to introduce an error into this file."
                    )
