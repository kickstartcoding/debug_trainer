module Update exposing (update)

import Actions exposing (Action(..))
import Json.Encode as Encode
import Model exposing (BreakPhase(..), Model(..), TrainerOptions)
import Ports


update : TrainerOptions -> Action -> Model -> ( Model, Cmd Action )
update { filepath } action model =
    case action of
        ReceiveFileContents contents ->
            let
                newContents =
                    contents |> String.toLower

                newFile =
                    Encode.object
                        [ ( "path", Encode.string filepath )
                        , ( "contents", Encode.string newContents )
                        ]
            in
            ( Break filepath WritingFile
            , Ports.writeFile newFile
            )

