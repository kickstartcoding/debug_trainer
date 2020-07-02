module Update exposing (update)

import Actions exposing (Action(..))
import Breakers.CaseSwap
import Json.Encode as Encode
import Model exposing (BreakPhase(..), Mode(..), Model, TrainerOptions)
import Ports


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
                Just ( newContents, encodedChangeData ) ->
                    let
                        newFile =
                            Encode.object
                                [ ( "path", Encode.string filepath )
                                , ( "contents", Encode.string newContents )
                                ]
                    in
                    ( { model | mode = Break filepath WritingFile }
                    , Cmd.batch
                        [ Ports.writeFile newFile
                        , Ports.writeFile newFile
                        ]
                    )

                Nothing ->
                    ( model
                    , Ports.printAndExitFailure "Error: unable to find a good way to introduce an error into this file."
                    )
