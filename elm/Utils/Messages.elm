module Utils.Messages exposing (noRecordOfChangeMessage, withNewlineBuffers)

import Utils.Types.FilePath as FilePath exposing (FilePath)


noRecordOfChangeMessage : FilePath -> String
noRecordOfChangeMessage filepath =
    "debug_trainer has no record of "
        ++ FilePath.toString filepath
        ++ " being changed. Either it has never been changed or the changes that were made have been reverted"
        |> withNewlineBuffers


withNewlineBuffers : String -> String
withNewlineBuffers string =
    "\n\n"
        ++ string
        ++ "\n\n"
