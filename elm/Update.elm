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
                newContents =
                    contents
                        |> Breakers.CaseSwap.run model.randomNumber

                newFile =
                    Encode.object
                        [ ( "path", Encode.string filepath )
                        , ( "contents", Encode.string newContents )
                        ]
            in
            ( { model | mode = Break filepath WritingFile }
            , Ports.writeFile newFile
            )
