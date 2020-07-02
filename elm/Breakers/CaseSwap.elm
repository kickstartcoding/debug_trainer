module Breakers.CaseSwap exposing (run)

import List.Extra as ListEx
import Parsers.Generic exposing (Segment(..))
import String.Extra as StrEx


run : Int -> String -> String
run randomNumber string =
    case Parsers.Generic.run string of
        Ok segments ->
            let
                candidateWords =
                    segments
                        |> List.indexedMap Tuple.pair
                        |> List.filterMap maybeWordCandidateFromSegment

                candidateCount =
                    List.length candidateWords

                maybeSelectedWord =
                    if candidateCount > 0 then
                        let
                            indexOfSelectedWord =
                                modBy candidateCount randomNumber
                        in
                        ListEx.getAt indexOfSelectedWord candidateWords

                    else
                        Nothing
            in
            case maybeSelectedWord of
                Just ( index, selectedWord ) ->
                    let
                        newWord =
                            if StrEx.toTitleCase selectedWord == selectedWord then
                                StrEx.decapitalize selectedWord

                            else
                                StrEx.toTitleCase selectedWord
                    in
                    segments
                        |> ListEx.setAt index (Word newWord)
                        |> mergeSegments

                Nothing ->
                    string

        Err _ ->
            string


mergeSegments : List Segment -> String
mergeSegments segments =
    segments
        |> List.map
            (\segment ->
                case segment of
                    Word string ->
                        string

                    Whitespace string ->
                        string

                    Other string ->
                        string
            )
        |> String.join ""


maybeWordCandidateFromSegment : ( Int, Segment ) -> Maybe ( Int, String )
maybeWordCandidateFromSegment ( index, segment ) =
    case segment of
        Word word ->
            if String.length word > 1 && not (isAllUpperCase word) then
                Just ( index, word )

            else
                Nothing

        _ ->
            Nothing


isAllUpperCase : String -> Bool
isAllUpperCase string =
    String.toUpper string == string
