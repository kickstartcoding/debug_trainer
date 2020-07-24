import fs from 'fs'
import * as SavedData from '../savedData'
import { devLog } from '../logging'

export default function (program): void {
  program.ports.writeFile.subscribe((fileData: { path: string, content: string }): void => {
    createFileIfAbsent(fileData.path)

    devLog(`Writing new content of ${fileData.path}...`)
    fs.writeFile(fileData.path, fileData.content, function (err) {
      if (err) {
        console.error(err)
        process.exit(1)
      }

      devLog('New file content written!');
      // SavedData.save(fileData.dataToSave)
      program.ports.successfulFileWrite.send(fileData)
    })
  })
}

function createFileIfAbsent(filepath: string): void {
  if (!fs.existsSync(filepath)) {
    fs.closeSync(fs.openSync(filepath, 'w'))
  }
}