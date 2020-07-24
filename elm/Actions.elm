module Actions exposing (Action(..))

import Commands.Break.Actions
import Commands.Explain.Actions
import Commands.Hint.Actions
import Commands.Reset.Actions
import Utils.Types.FilePath exposing (FilePath)


type Action
    = BreakAction FilePath Commands.Break.Actions.Action
    | HintAction FilePath Commands.Hint.Actions.Action
    | ExplainAction FilePath Commands.Explain.Actions.Action
    | ResetAction FilePath Commands.Reset.Actions.Action
