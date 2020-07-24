module Commands.Break.Update exposing (update)

import Commands.Break.Actions exposing (Action(..))
import Commands.Break.Update.BreakFile
import Model exposing (Command(..), Model)
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)
import Model exposing (filePathStringFromCommand)


update : FilePath -> Action -> Model -> ( Model, Cmd Action )
update filepath action model =
    case action of
        SuccessfulFileRead{ contents} ->
            Commands.Break.Update.BreakFile.run filepath contents model
        SuccessfulFileWrite {path} ->
            if FilePath.fromString path == filepath then
                
            else


