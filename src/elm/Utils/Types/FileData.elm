module Utils.Types.FileData exposing (ChangeData, FileData, codec)

import Codec exposing (Codec)
import Utils.Types.BreakType as BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


type alias FileData =
    { originalContent : String
    , updatedContent : String
    , changes : List ChangeData
    , path : FilePath
    }


type alias ChangeData =
    { lineNumber : Int
    , breakType : BreakType
    , changeDescription : String
    }


codec : Codec FileData
codec =
    Codec.object FileData
        |> Codec.field "originalContent" .originalContent Codec.string
        |> Codec.field "updatedContent" .updatedContent Codec.string
        |> Codec.field "changes" .changes (Codec.list changeDataCodec)
        |> Codec.field "path" .path (Codec.map FilePath.fromString FilePath.toString Codec.string)
        |> Codec.buildObject


changeDataCodec : Codec ChangeData
changeDataCodec =
    Codec.object ChangeData
        |> Codec.field "lineNumber" .lineNumber Codec.int
        |> Codec.field "breakType" .breakType BreakType.codec
        |> Codec.field "changeDescription" .changeDescription Codec.string
        |> Codec.buildObject
