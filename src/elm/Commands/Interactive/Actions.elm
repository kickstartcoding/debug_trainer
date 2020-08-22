module Commands.Interactive.Actions exposing (Action(..))

import Utils.Types.FileData exposing (FileData)
import Utils.Types.FilePath exposing (FilePath)


type Action
    = ReceivedUserBreakCountChoice (Maybe FilePath) Int
    | GotTargetFileChoice FilePath
    | GotTargetFileContent { path : String, content : String }
    | PresentSolveMenu FileData
    | ReceivedUserSolveMenuChoice FileData String
    | PresentRestartMenu
    | ReceivedUserRestartMenuChoice FilePath String
    | Exit
