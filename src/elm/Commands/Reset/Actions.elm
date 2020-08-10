module Commands.Reset.Actions exposing (Action(..))


type Action
    = SuccessfulFileWrite { path : String, content : String }
