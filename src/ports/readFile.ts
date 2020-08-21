import * as fs from 'fs'
import { devLog, formattedLog, formattedErrorLog } from '../utils'

export default function (program): void {
  program.ports.readFile.subscribe((filepath: string): void => {
    devLog(`Reading content of \`${filepath}\`...`)
    fs.readFile(filepath, 'utf8', function (err, content) {
      if (err) {
        if (err.code === "ENOENT") {
          formattedErrorLog(`I couldn't find a file at \`${filepath}\``)
        } else {
          formattedErrorLog(err.toString())
        }
        process.exit(1)
      }

      // devLog(`Content of \`${filepath}\`: ${content}`)
      program.ports.successfulFileRead.send({ path: filepath, content: content })
    });

  });
}