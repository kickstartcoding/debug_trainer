module Update exposing (update)

import Actions exposing (Action(..))
import Breakers.CaseSwap
import Model exposing (CliOptions, Command(..), Model, Phase(..))
import Ports
import SavedData.Model as SavedData
import Utils.Types.FilePath exposing (FilePath)


update : CliOptions -> Action -> Model -> ( Model, Cmd Action )
update { command } action model =
    case command of
        Break filepath _ ->
            updateBreak filepath action model

        Hint _ _ ->
            ( model, Cmd.none )

        Reset _ ->
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
                    in
                    ( { model | command = Break filepath WritingFile }
                    , Ports.writeFileWith
                        { path = filepath
                        , contents = newContents
                        , dataToSave = newSavedData
                        }
                    )

                Nothing ->
                    ( model
                    , Ports.printAndExitFailure "Error: unable to find a good way to introduce an error into this file."
                    )
