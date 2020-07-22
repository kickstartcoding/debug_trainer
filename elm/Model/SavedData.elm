module Model.SavedData exposing
    ( Change
    , SavedData
    , SavedDataError(..)
    , decode
    , encode
    , errorMessage
    , fromFlag
    , getChange
    , getFileData
    , init
    , removeFileData
    , savedDataOrInit
    , setChange
    )

import Codec exposing (Codec, Decoder, Value)
import Dict exposing (Dict)
import Json.Decode
import Utils.Types.BreakType as BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)
import Utils.Types.ReplacementData as ReplacementData exposing (ReplacementData)


type alias SavedData =
    { changedFiles : Dict String FileData
    }


type alias FileData =
    { originalContent : String
    , change : Change
    , hintsGiven : Int
    }


type alias Change =
    { replacementData : ReplacementData
    , breakType : BreakType
    }


type SavedDataError
    = FileMissing
    | DecodingFailed String


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


getFileData : FilePath -> SavedData -> Maybe FileData
getFileData filepath savedData =
    Dict.get (FilePath.toString filepath) savedData.changedFiles


removeFileData : FilePath -> SavedData -> SavedData
removeFileData filepath savedData =
    { savedData | changedFiles = Dict.remove (FilePath.toString filepath) savedData.changedFiles }


getChange : FilePath -> SavedData -> Maybe Change
getChange filepath savedData =
    savedData
        |> getFileData filepath
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
                            Just
                                { originalContent = fileContent
                                , change = change
                                , hintsGiven = 0
                                }
                )
                changedFiles
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


errorMessage : FilePath -> SavedDataError -> String
errorMessage dataFilePath error =
    case error of
        FileMissing ->
            "\n\n"
                ++ "Could not find any save data at "
                ++ FilePath.toString dataFilePath
                ++ ". That file is where debug_trainer stores data on what files it has changed."
                ++ " Without it, this feature won't work."
                ++ "\n\n"

        DecodingFailed reason ->
            "\n\n"
                ++ "Unable to parse the saved data file at "
                ++ FilePath.toString dataFilePath
                ++ ". Here is the error it gave:\n\n"
                ++ reason
                ++ "\n\nThe save file at "
                ++ FilePath.toString dataFilePath
                ++ " may be broken. If this error persists, try deleting "
                ++ FilePath.toString dataFilePath
                ++ " and then running debug_trainer again."
                ++ "\n\n"


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
        |> Codec.field "hintsGiven" .hintsGiven Codec.int
        |> Codec.buildObject


changeCodec : Codec Change
changeCodec =
    Codec.object Change
        |> Codec.field "replacementData" .replacementData ReplacementData.codec
        |> Codec.field "breakType" .breakType BreakType.codec
        |> Codec.buildObject
