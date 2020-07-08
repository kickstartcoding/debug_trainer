module SavedData.Model exposing
    ( Change(..)
    , SavedData
    , SavedDataError(..)
    , decode
    , encode
    , fromFlag
    , getChange
    , init
    , savedDataOrInit
    , setChange
    )

import Breakers.CaseSwap as CaseSwap
import Codec exposing (Codec, Decoder, Value)
import Dict exposing (Dict)
import Json.Decode
import Utils.Types.FilePath as FilePath exposing (FilePath)


type Change
    = CaseSwap CaseSwap.ChangeData


init : SavedData
init =
    { changedFiles = Dict.empty }


savedDataOrInit : Result SavedDataError SavedData -> SavedData
savedDataOrInit savedDataResult =
    case savedDataResult of
        Ok data ->
            data

        Err _ ->
            init


getChange : FilePath -> SavedData -> Maybe Change
getChange filepath savedData =
    Dict.get (FilePath.toString filepath) savedData.changedFiles
        |> Maybe.map .change


setChange : { filepath : FilePath, fileContent : String, change : Change } -> SavedData -> SavedData
setChange { filepath, fileContent, change } ({ changedFiles } as model) =
    { model
        | changedFiles =
            Dict.update (FilePath.toString filepath)
                (\maybeFileData ->
                    case maybeFileData of
                        Just fileData ->
                            Just { fileData | change = change }

                        Nothing ->
                            Just { originalContent = fileContent, change = change }
                )
                changedFiles
    }


type alias SavedData =
    { changedFiles : Dict String FileData
    }


type alias FileData =
    { originalContent : String
    , change : Change
    }


fromFlag : Maybe String -> Result SavedDataError SavedData
fromFlag maybeDataString =
    case maybeDataString of
        Just string ->
            case Codec.decodeString codec string of
                Ok savedData ->
                    Ok savedData

                Err error ->
                    Err (DecodingFailed (Json.Decode.errorToString error))

        Nothing ->
            Err FileMissing


type SavedDataError
    = FileMissing
    | DecodingFailed String


encode : SavedData -> Value
encode savedData =
    Codec.encodeToValue codec savedData


decode : Decoder SavedData
decode =
    Codec.decoder codec


codec : Codec SavedData
codec =
    Codec.object SavedData
        |> Codec.field "changedFiles" .changedFiles (Codec.dict fileDataCodec)
        |> Codec.buildObject


fileDataCodec : Codec FileData
fileDataCodec =
    Codec.object FileData
        |> Codec.field "originalContent" .originalContent Codec.string
        |> Codec.field "change" .change changeCodec
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