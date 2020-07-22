module Commands.Hint.Update exposing (update)

import Commands.Hint.Actions exposing (Action(..))
import Model exposing (CliOptions, Command(..), Model)
import Model.SavedData as SavedData
import Parsers.Generic.Parser as GenericParser
import Parsers.Generic.Segment exposing (Segment)
import Ports
import Utils.List
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


update : FilePath -> Action -> Model -> ( Model, Cmd Action )
update filepath action model =
    case action of
        NoOp ->
            ( model, Cmd.none )
