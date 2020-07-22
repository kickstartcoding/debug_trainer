module Commands.Reset.Cmd exposing (init)

import Actions exposing (Action)
import Model exposing (Command(..), Model)
import Model.SavedData as SavedData exposing (SavedDataError(..))
import Ports
import Utils.Types.BreakType exposing (BreakType(..))
import Utils.Types.FilePath as FilePath exposing (FilePath)


init : FilePath -> Model -> Cmd Action
init filepath { savedDataResult, dataFilePath, workingDirectory } =
    case savedDataResult of
        Ok data ->
            case
                SavedData.getFileData
                    { filepath = filepath
                    , workingDirectory = workingDirectory
                    }
                    data
            of
                Just { originalContent } ->
                    Ports.writeFileWith
                        { path = filepath
                        , contents = originalContent
                        , dataToSave =
                            SavedData.removeFileData
                                { filepath = filepath
                                , workingDirectory = workingDirectory
                                }
                                data
                        }

                Nothing ->
                    Ports.printAndExitFailure
                        ("\n\n"
                            ++ "debug_trainer has no record of "
                            ++ FilePath.toString filepath
                            ++ " being changed. Either it has never been changed or "
                            ++ "the changes that were made have been reverted."
                            ++ "\n\n"
                        )

        Err error ->
            error
                |> SavedData.errorMessage dataFilePath
                |> Ports.printAndExitFailure
