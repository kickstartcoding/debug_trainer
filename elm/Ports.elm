port module Ports exposing
    ( print
    , printAndExitFailure
    , printAndExitSuccess
    , readFile
    , successfulFileRead
    , successfulFileWrite
    , writeFileWith
    )

import Json.Encode
import Model.SavedData as SavedData exposing (SavedData)
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


port successfulFileWrite : ({ path : String, content : String } -> action) -> Sub action


port successfulFileRead : ({ path : String, content : String } -> action) -> Sub action


port printAndExitFailure : String -> Cmd action


port printAndExitSuccess : String -> Cmd action
