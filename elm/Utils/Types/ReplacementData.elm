module Utils.Types.ReplacementData exposing
    ( ContentData
    , ReplacementData
    , codec
    , decode
    , encode
    )

import Codec exposing (Codec, Decoder, Value)


type alias ReplacementData =
    { originalContent : ContentData
    , newContent : ContentData
    }


type alias ContentData =
    { start : Int
    , end : Int
    , content : String
    }


encode : ReplacementData -> Value
encode =
    Codec.encodeToValue codec


decode : Decoder ReplacementData
decode =
    Codec.decoder codec


codec : Codec ReplacementData
codec =
    Codec.object ReplacementData
        |> Codec.field "originalContent" .originalContent contentDataCodec
        |> Codec.field "newContent" .newContent contentDataCodec
        |> Codec.buildObject


contentDataCodec : Codec ContentData
contentDataCodec =
    Codec.object ContentData
        |> Codec.field "start" .start Codec.int
        |> Codec.field "end" .end Codec.int
        |> Codec.field "content" .content Codec.string
        |> Codec.buildObject
