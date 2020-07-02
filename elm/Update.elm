module Update exposing (update)

import Actions exposing (Action(..))
import Breakers.CaseSwap
import Codec
import Json.Encode as Encode
import Model exposing (BreakPhase(..), Mode(..), Model, TrainerOptions)
import Ports
import SavedData.Model


update : TrainerOptions -> Action -> Model -> ( Model, Cmd Action )
update { filepath } action model =
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
                        newSavedData =
                            SavedData.Model.pushChange
                                { filepath = filepath
                                , fileContent = contents
                                , change = SavedData.Model.CaseSwap changeData
                                }
                                model.savedData

                        writeFileData =
                            Encode.object
                                [ ( "path", Encode.string filepath )
                                , ( "contents", Encode.string newContents )
                                , ( "dataToSave", Codec.encodeToValue SavedData.Model.codec newSavedData )
                                ]
                    in
                    ( { model | mode = Break filepath WritingFile }
                    , Ports.writeFile writeFileData
                    )

                Nothing ->
                    ( model
                    , Ports.printAndExitFailure "Error: unable to find a good way to introduce an error into this file."
                    )
