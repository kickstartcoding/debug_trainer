module Utils.Types.FilePath exposing
    ( FilePath
    , decode
    , encode
    , fromString
    , fullPath
    , toString
    )

import Codec exposing (Codec, Decoder, Value)


type FilePath
    = FilePath String


fullPath : String -> FilePath -> FilePath
fullPath workingDirectory (FilePath filepath) =
    if String.startsWith workingDirectory filepath then
        FilePath filepath

    else if String.startsWith "./" filepath then
        FilePath <| workingDirectory ++ "/" ++ String.dropLeft 2 filepath

    else if String.startsWith "../" filepath then
        FilePath <| walkTree workingDirectory filepath

    else
        FilePath <| workingDirectory ++ "/" ++ filepath


walkTree : String -> String -> String
walkTree workingDirectory filepath =
    let
        navCount =
            (filepath
                |> String.split "../"
                |> List.length
            )
                - 1

        workingDirectoryDirs =
            workingDirectory |> String.split "/"

        newWorkingDirectory =
            workingDirectoryDirs
                |> List.reverse
                |> List.drop navCount
                |> List.reverse
                |> String.join "/"

        newFilePath =
            filepath
                |> String.split "../"
                |> List.drop navCount
                |> String.join ""
    in
    newWorkingDirectory ++ "/" ++ newFilePath


toString : FilePath -> String
toString (FilePath string) =
    string


fromString : String -> FilePath
fromString string =
    FilePath string


encode : FilePath -> Value
encode =
    Codec.encoder codec


decode : Decoder FilePath
decode =
    Codec.decoder codec


codec : Codec FilePath
codec =
    Codec.map fromString toString Codec.string
