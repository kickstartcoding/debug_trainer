module Utils.Types.LoggingStatus exposing
    ( LoggingStatus(..)
    , decode
    , encode
    , fromBool
    , toBool
    )

import Codec exposing (Codec, Decoder, Value)


type LoggingStatus
    = LoggingOn
    | LoggingOff


fromBool : Bool -> LoggingStatus
fromBool bool =
    if bool then
        LoggingOn

    else
        LoggingOff


toBool : LoggingStatus -> Bool
toBool loggingStatus =
    case loggingStatus of
        LoggingOn ->
            True

        LoggingOff ->
            False


encode : LoggingStatus -> Value
encode =
    Codec.encoder codec


decode : Decoder LoggingStatus
decode =
    Codec.decoder codec


codec : Codec LoggingStatus
codec =
    Codec.map fromBool toBool Codec.bool
