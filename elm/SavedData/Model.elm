module SavedData.Model exposing (Model, codec, init, pushChange, Change(..))

import Breakers.CaseSwap as CaseSwap
import Codec exposing (Codec, Value)
import Dict exposing (Dict)


type Change
    = CaseSwap CaseSwap.ChangeData


init : Model
init =
    { changedFiles = Dict.empty }


pushChange : { filepath : String, fileContent : String, change : Change } -> Model -> Model
pushChange { filepath, fileContent, change } ({ changedFiles } as model) =
    { model
        | changedFiles =
            Dict.update filepath
                (\maybeFileData ->
                    case maybeFileData of
                        Just fileData ->
                            Just { fileData | changes = change :: fileData.changes }

                        Nothing ->
                            Just { originalContent = fileContent, changes = [ change ] }
                )
                changedFiles
    }


type alias Model =
    { changedFiles : Dict String FileData
    }


type alias FileData =
    { originalContent : String
    , changes : List Change
    }


codec : Codec Model
codec =
    Codec.object Model
        |> Codec.field "changedFiles" .changedFiles (Codec.dict fileDataCodec)
        |> Codec.buildObject


fileDataCodec : Codec FileData
fileDataCodec =
    Codec.object FileData
        |> Codec.field "originalContent" .originalContent Codec.string
        |> Codec.field "changes" .changes (Codec.list changeCodec)
        |> Codec.buildObject


changeCodec : Codec Change
changeCodec =
    Codec.custom
        (\caseSwap change ->
            case change of
                CaseSwap changeData ->
                    caseSwap changeData
        )
        |> Codec.variant1 "CaseSwap" CaseSwap CaseSwap.codec
        |> Codec.buildCustom
