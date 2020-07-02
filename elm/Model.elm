module Model exposing
    ( BreakPhase(..)
    , Mode(..)
    , Model
    , TrainerOptions
    )

import SavedData.Model


type alias TrainerOptions =
    { filepath : String
    }


type alias Model =
    { randomNumber : Int
    , savedData : SavedData.Model.Model
    , mode : Mode
    }


type Mode
    = Break String BreakPhase


type BreakPhase
    = ReadingFile
    | WritingFile
