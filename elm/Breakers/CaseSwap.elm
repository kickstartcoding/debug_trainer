module Breakers.CaseSwap exposing
    ( ChangeData
    , codec
    , run
    )

import Codec exposing (Codec, Value)
import List.Extra as ListEx
import Parsers.Generic.Parser
import Parsers.Generic.Segment as Segment exposing (Segment(..))
import Utils.List
import Utils.String as StrUtils
import Utils.Types.FilePath as FilePath


run : Int -> String -> Maybe ( String, ChangeData )
run randomNumber string =
    case Parsers.Generic.Parser.run string of
        Ok segments ->
            changeOneWord randomNumber segments
                |> Maybe.map
                    (\( newSegments, changeData ) ->
                        ( newSegments
                            |> List.map Segment.toString
                            |> String.join ""
                          -- , Codec.encoder codec changeData
                        , changeData
                        )
                    )

        Err _ ->
            Nothing


changeOneWord : Int -> List Segment -> Maybe ( List Segment, ChangeData )
changeOneWord randomNumber segments =
    segments
        |> chooseWordToChange randomNumber
        |> Maybe.map
            (\{ index, offset, content } ->
                let
                    newWord =
                        StrUtils.toggleTitleCase content
                in
                ( ListEx.setAt index (Word offset newWord) segments
                , { originalWord =
                        { start = offset
                        , end = offset + String.length content
                        , content = content
                        }
                  , newWord =
                        { start = offset
                        , end = offset + String.length newWord
                        , content = newWord
                        }
                  }
                )
            )


chooseWordToChange : Int -> List Segment -> Maybe { index : Int, offset : Int, content : String }
chooseWordToChange randomNumber segments =
    segments
        |> Segment.wordsWithIndicesWhere isCandidate
        |> Utils.List.pickRandom randomNumber


isCandidate : String -> Bool
isCandidate string =
    StrUtils.isMoreThanOneCharacter string
        && not (StrUtils.isAllCaps string)


type alias ChangeData =
    { originalWord : WordData
    , newWord : WordData
    }


type alias WordData =
    { start : Int
    , end : Int
    , content : String
    }


codec : Codec ChangeData
codec =
    Codec.object ChangeData
        |> Codec.field "originalWord" .originalWord wordDataCodec
        |> Codec.field "newWord" .newWord wordDataCodec
        |> Codec.buildObject


wordDataCodec : Codec WordData
wordDataCodec =
    Codec.object WordData
        |> Codec.field "start" .start Codec.int
        |> Codec.field "end" .end Codec.int
        |> Codec.field "content" .content Codec.string
        |> Codec.buildObject
