module Data.Model exposing (Model, init)

import Breakers.CaseSwap as CaseSwap
import Dict exposing (Dict)


type Change
    = CaseSwap CaseSwap.ChangeData


init : Model
init =
    { changedFiles = Dict.empty }


type alias Model =
    { changedFiles :
        Dict String
            { path : String
            , changes : List Change
            , originalContent : String
            }
    }
