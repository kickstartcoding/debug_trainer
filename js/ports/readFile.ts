import fs from 'fs'
import { devLog, formattedErrorLog } from '../utils'

export default function (program): void {
  program.ports.readFile.subscribe((filepath: string): void => {
    devLog(`Reading content of \`${filepath}\`...`)
    fs.readFile(filepath, 'utf8', function (err, content) {
      if (err) {
        formattedErrorLog(err)
        process.exit(1)
      }

      program.ports.successfulFileRead.send({ path: filepath, content: content })
    });

  });
}