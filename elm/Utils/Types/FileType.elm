module Utils.Types.FileType exposing (FileType(..), fromFilePath)

import String
import Utils.Types.FilePath as FilePath exposing (FilePath)


type FileType
    = Python
    | JavaScript
    | Ruby
    | Unknown


fromFilePath : FilePath -> FileType
fromFilePath filepath =
    let
        filepathString =
            FilePath.toString filepath
    in
    if String.endsWith ".js" filepathString then
        JavaScript

    else if String.endsWith ".py" filepathString then
        Python

    else if String.endsWith ".rb" filepathString then
        Ruby

    else
        Unknown
