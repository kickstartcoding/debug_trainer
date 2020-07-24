import fs from 'fs'
const { devLog } = require('../logging')

export default function (program): void {
  program.ports.readFile.subscribe((filepath: string): void => {
    devLog(`Reading content of ${filepath}...`)
    fs.readFile(filepath, 'utf8', function (err, content) {
      if (err) {
        console.error(err)
        process.exit(1)
      }

      program.ports.successfulFileRead.send({ path: filepath, content: content })
    });

  });
}