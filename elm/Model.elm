module Model exposing (TrainerOptions, BreakPhase(..), Model(..))

type alias TrainerOptions =
    { filepath : String
    }

type Model
    = Break String BreakPhase


type BreakPhase
    = ReadingFile
    | WritingFile
