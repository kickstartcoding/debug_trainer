module Utils.Types.BreakType exposing
    ( BreakType(..)
    , allBreakTypes
    , codec
    , decode
    , encode
    , toChangeDescription
    )

import Codec exposing (Codec, Decoder, Value)


type BreakType
    = CaseSwap
    | RemoveReturn
    | RemoveParenthesis
    | ChangeFunctionArgs
    | RemoveDotAccess


allBreakTypes : List BreakType
allBreakTypes =
    [ CaseSwap
    , RemoveReturn
    , RemoveParenthesis
    , ChangeFunctionArgs
    , RemoveDotAccess
    ]


toChangeDescription : BreakType -> String
toChangeDescription breakType =
    case breakType of
        CaseSwap ->
            "somewhere in this file, debug_trainer changed a word from "
                ++ "starting with a capital letter to starting with "
                ++ "a lowercase letter or vice versa."

        RemoveReturn ->
            "somewhere in this file, debug_trainer removed "
                ++ "a `return` keyword from a function."

        RemoveParenthesis ->
            "somewhere in this file, debug_trainer removed "
                ++ "an opening or closing parenthesis or bracket."

        ChangeFunctionArgs ->
            "somewhere in this file, debug_trainer changed "
                ++ "the arguments to a function."

        RemoveDotAccess ->
            "somewhere in this file, debug_trainer removed "
                ++ "one part of a dot-access chain (for example, "
                ++ "changing thing1.thing2.thing3 to thing1.thing2)."


encode : BreakType -> Value
encode =
    Codec.encoder codec


decode : Decoder BreakType
decode =
    Codec.decoder codec


codec : Codec BreakType
codec =
    Codec.custom
        (\caseSwap removeReturn removeParenthesis changeFunctionArgs removeDotAccess value ->
            case value of
                CaseSwap ->
                    caseSwap

                RemoveReturn ->
                    removeReturn

                RemoveParenthesis ->
                    removeParenthesis

                ChangeFunctionArgs ->
                    changeFunctionArgs

                RemoveDotAccess ->
                    removeDotAccess
        )
        |> Codec.variant0 "CaseSwap" CaseSwap
        |> Codec.variant0 "RemoveReturn" RemoveReturn
        |> Codec.variant0 "RemoveParenthesis" RemoveParenthesis
        |> Codec.variant0 "ChangeFunctionArgs" ChangeFunctionArgs
        |> Codec.variant0 "RemoveDotAccess" RemoveDotAccess
        |> Codec.buildCustom
