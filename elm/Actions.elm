module Actions exposing (Action(..))

import Commands.Break.Actions
import Commands.Explain.Actions
import Commands.Hint.Actions
import Commands.Reset.Actions


type Action
    = BreakAction Commands.Break.Actions.Action
    | HintAction Commands.Hint.Actions.Action
    | ExplainAction Commands.Explain.Actions.Action
    | ResetAction Commands.Reset.Actions.Action
