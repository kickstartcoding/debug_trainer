module Commands.Interactive.Actions exposing (Action(..))

import Utils.Types.FileData exposing (FileData)


type Action
    = GotTargetFileContent { path : String, content : String }
    | PresentSolveMenu FileData
    | ReceivedUserSolveMenuChoice FileData String
    | PresentRestartMenu
    | ReceivedUserRestartMenuChoice String
    | Exit
