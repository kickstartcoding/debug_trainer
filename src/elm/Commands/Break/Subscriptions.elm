module Commands.Break.Subscriptions exposing (subscriptions)

import Commands.Break.Actions exposing (Action(..))
import Model exposing (Command(..), Model)
import Ports
import Utils.Types.FilePath as FilePath


subscriptions : Model -> Sub Action
subscriptions model =
    Sub.batch
        [ Ports.successfulFileRead GotTargetFileContent
        , Ports.successfulFileWrite
            (\{ path } ->
                if FilePath.fromString path == model.dataFilePath then
                    SuccessfullyUpdatedSavedDataFile

                else
                    SuccessfullyBrokeTargetFile
            )
        ]
