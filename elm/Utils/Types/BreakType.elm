module Utils.Types.BreakType exposing
    ( BreakType(..)
    , codec
    , decode
    , encode
    , fromString
    , toString
    )

import Codec exposing (Codec, Decoder, Value)


type BreakType
    = CaseSwap
    | RemoveReturn


toString : BreakType -> String
toString breakType =
    case breakType of
        CaseSwap ->
            "CaseSwap"

        RemoveReturn ->
            "RemoveReturn"


fromString : String -> BreakType
fromString string =
    case string of
        "CaseSwap" ->
            CaseSwap

        "RemoveReturn" ->
            RemoveReturn

        _ ->
            CaseSwap


encode : BreakType -> Value
encode =
    Codec.encoder codec


decode : Decoder BreakType
decode =
    Codec.decoder codec


codec : Codec BreakType
codec =
    Codec.map fromString toString Codec.string
