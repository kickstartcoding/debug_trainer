module Utils.Types.FilePath exposing
    ( FilePath
    , decode
    , encode
    , fromString
    , toString
    )

import Codec exposing (Codec, Decoder, Value)


type FilePath
    = FilePath String


toString : FilePath -> String
toString (FilePath string) =
    string


fromString : String -> FilePath
fromString string =
    FilePath string


encode : FilePath -> Value
encode =
    Codec.encoder codec


decode : Decoder FilePath
decode =
    Codec.decoder codec


codec : Codec FilePath
codec =
    Codec.map fromString toString Codec.string
