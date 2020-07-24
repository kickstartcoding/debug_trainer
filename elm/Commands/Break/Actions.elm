module Commands.Break.Actions exposing (Action(..))


type Action
    = SuccessfulFileRead { path : String, content : String }
    | SuccessfulFileWrite { path : String, content : String }
