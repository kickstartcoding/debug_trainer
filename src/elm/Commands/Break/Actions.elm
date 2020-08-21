module Commands.Break.Actions exposing (Action(..))


type Action
    = GotTargetFileContent { path : String, content : String }
    | SuccessfullyUpdatedSavedDataFile
    | SuccessfullyBrokeTargetFile
