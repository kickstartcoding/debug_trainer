import fs from 'fs'
import { devLog, formattedErrorLog } from '../utils'

export default function (program): void {
  program.ports.writeFile.subscribe((fileData: { path: string, content: string }): void => {
    createFileIfAbsent(fileData.path)

    devLog(`Writing new content of \`${fileData.path}\`...`)
    fs.writeFile(fileData.path, fileData.content, function (err) {
      if (err) {
        if (err.code === "ENOENT") {
          formattedErrorLog(`I couldn't find a file at \`${fileData.path}\``)
        } else {
          formattedErrorLog(err.toString())
        }
        process.exit(1)
      }

      devLog('New file content written!');
      devLog("fileData:", JSON.stringify(fileData));

      program.ports.successfulFileWrite.send(fileData)
    })
  })
}

function createFileIfAbsent(filepath: string): void {
  if (!fs.existsSync(filepath)) {
    fs.closeSync(fs.openSync(filepath, 'w'))
  }
}