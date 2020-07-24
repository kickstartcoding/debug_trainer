import fs from 'fs'
import * as SavedData from '../savedData'
import { devLog } from '../logging'

export default function (program): void {
  program.ports.writeFile.subscribe(fileData => {
    devLog(`Writing new contents of ${fileData.path}...`)
    fs.writeFile(fileData.path, fileData.contents, function (err) {
      if (err) {
        console.error(err)
        process.exit(1)
      }

      devLog('New file contents written!');
      // SavedData.save(fileData.dataToSave)
      program.ports.successfulFileWrite.send(fileData)
    })
  })
}
