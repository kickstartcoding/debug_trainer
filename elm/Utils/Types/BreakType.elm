module Utils.Types.BreakType exposing
    ( BreakType(..)
    , codec
    , decode
    , encode
    )

import Codec exposing (Codec, Decoder, Value)


type BreakType
    = CaseSwap
    | RemoveReturn
    | RemoveParenthesis
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
        (\caseSwap removeReturn removeParenthesis changeFunctionArgs value ->
            case value of
                CaseSwap ->
                    caseSwap

                RemoveReturn ->
                    removeReturn

                RemoveParenthesis ->
                    removeParenthesis

                ChangeFunctionArgs ->
                    changeFunctionArgs
        )
        |> Codec.variant0 "CaseSwap" CaseSwap
        |> Codec.variant0 "RemoveReturn" RemoveReturn
        |> Codec.variant0 "RemoveParenthesis" RemoveParenthesis
        |> Codec.variant0 "ChangeFunctionArgs" ChangeFunctionArgs
        |> Codec.buildCustom
