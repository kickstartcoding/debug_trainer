module Utils.Types.BreakType exposing
    ( BreakType(..)
    , codec
    , decode
    ,  encode
       -- , fromString
       -- , toString

    )

import Codec exposing (Codec, Decoder, Value)


type BreakType
    = CaseSwap
    | RemoveReturn
    | ChangeFunctionArgs


encode : BreakType -> Value
encode =
    Codec.encoder codec


decode : Decoder BreakType
decode =
    Codec.decoder codec


codec : Codec BreakType
codec =
    Codec.custom
        (\caseSwap removeReturn changeFunctionArgs value ->
            case value of
                CaseSwap ->
                    caseSwap

                RemoveReturn ->
                    removeReturn

                ChangeFunctionArgs ->
                    changeFunctionArgs
        )
        |> Codec.variant0 "CaseSwap" CaseSwap
        |> Codec.variant0 "RemoveReturn" RemoveReturn
        |> Codec.variant0 "ChangeFunctionArgs" ChangeFunctionArgs
        |> Codec.buildCustom
