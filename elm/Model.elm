module Model exposing
    ( BreakPhase(..)
    , Mode(..)
    , Model
    , TrainerOptions
    )


type alias TrainerOptions =
    { filepath : String
    }


type alias Model =
    { randomNumber : Int
    , mode : Mode
    }


type Mode
    = Break String BreakPhase


type BreakPhase
    = ReadingFile
    | WritingFile
