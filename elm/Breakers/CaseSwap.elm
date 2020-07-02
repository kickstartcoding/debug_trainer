module Breakers.CaseSwap exposing (run)

import List.Extra as ListEx
import Parsers.Generic.Parser
import Parsers.Generic.Segment as Segment exposing (Segment(..))
import Utils.List
import Utils.String as StrUtils


run : Int -> String -> String
run randomNumber string =
    case Parsers.Generic.Parser.run string of
        Ok segments ->
            segments
                |> changeOneWord randomNumber
                |> List.map Segment.toString
                |> String.join ""

        Err _ ->
            string


changeOneWord : Int -> List Segment -> List Segment
changeOneWord randomNumber segments =
    case chooseWordToChange randomNumber segments of
        Just ( index, selectedWord ) ->
            let
                newWord =
                    StrUtils.toggleTitleCase selectedWord
            in
            segments
                |> ListEx.setAt index (Word newWord)

        Nothing ->
            -- Don't change anything if we can't find any
            -- words to change
            segments


chooseWordToChange : Int -> List Segment -> Maybe ( Int, String )
chooseWordToChange randomNumber segments =
    segments
        |> Segment.wordsWithIndicesWhere isCandidate
        |> Utils.List.pickRandom randomNumber


isCandidate : String -> Bool
isCandidate string =
    StrUtils.isMoreThanOneCharacter string
        && not (StrUtils.isAllCaps string)
