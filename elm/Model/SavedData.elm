module Model.SavedData exposing
    ( ChangeData
    , FileData
    , SavedData
    , SavedDataError(..)
    , decode
    , encode
    , errorMessage
    , fromFlag
    , getFileData
    , init
    , removeFileData
    , savedDataOrInit
    , setFileData
    )

import Codec exposing (Codec, Decoder)
import Dict exposing (Dict)
import Json.Decode
import Utils.Types.BreakType as BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath, fullPath)


type alias SavedData =
    { changedFiles : Dict String FileData
    }


type alias FileData =
    { originalContent : String
    , updatedContent : String
    , changes : List ChangeData
    }


type alias ChangeData =
    { lineNumber : Int
    , breakType : BreakType
    , changeDescription : String
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


getFileData : { filepath : FilePath, workingDirectory : String } -> SavedData -> Maybe FileData
getFileData { filepath, workingDirectory } savedData =
    Dict.get (fullPathString workingDirectory filepath) savedData.changedFiles


removeFileData : { filepath : FilePath, workingDirectory : String } -> SavedData -> SavedData
removeFileData { filepath, workingDirectory } savedData =
    { savedData
        | changedFiles =
            Dict.remove
                (fullPathString workingDirectory filepath)
                savedData.changedFiles
    }


setFileData :
    { filepath : FilePath
    , workingDirectory : String
    , fileData : FileData
    }
    -> SavedData
    -> SavedData
setFileData { filepath, workingDirectory, fileData } ({ changedFiles } as model) =
    { model
        | changedFiles =
            Dict.update (fullPathString workingDirectory filepath)
                (\maybeFileData -> Just fileData)
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


fullPathString : String -> FilePath -> String
fullPathString workingDirectory filepath =
    FilePath.fullPath workingDirectory filepath
        |> FilePath.toString


encode : SavedData -> String
encode savedData =
    Codec.encodeToString 0 codec savedData


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
        |> Codec.field "updatedContent" .updatedContent Codec.string
        |> Codec.field "changes" .changes (Codec.list changeDataCodec)
        |> Codec.buildObject


changeDataCodec : Codec ChangeData
changeDataCodec =
    Codec.object ChangeData
        |> Codec.field "lineNumber" .lineNumber Codec.int
        |> Codec.field "breakType" .breakType BreakType.codec
        |> Codec.field "changeDescription" .changeDescription Codec.string
        |> Codec.buildObject
