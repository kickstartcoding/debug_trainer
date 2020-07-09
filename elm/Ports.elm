port module Ports exposing
    ( print
    , printAndExitFailure
    , printAndExitSuccess
    , readFile
    , receiveFileContents
    , writeFileWith
    )

import Json.Encode
import SavedData.Model as SavedData exposing (SavedData)
import Utils.Types.FilePath as FilePath exposing (FilePath)


port print : String -> Cmd action


port readFile : String -> Cmd action


writeFileWith : { path : FilePath, contents : String, dataToSave : SavedData } -> Cmd action
writeFileWith { path, contents, dataToSave } =
    Json.Encode.object
        [ ( "path", FilePath.encode path )
        , ( "contents", Json.Encode.string contents )
        , ( "dataToSave", SavedData.encode dataToSave )
        ]
        |> writeFile


port writeFile : Json.Encode.Value -> Cmd action


port receiveFileContents : (String -> action) -> Sub action


port printAndExitFailure : String -> Cmd action


port printAndExitSuccess : String -> Cmd action
