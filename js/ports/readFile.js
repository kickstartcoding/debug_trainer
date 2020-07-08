import fs from 'fs'
// fs = require('fs')
const { devLog } = require('../logging.js')

export default function (program) {
  program.ports.readFile.subscribe(filepath => {
    devLog(`Reading contents of ${filepath}...`);
    fs.readFile(filepath, 'utf8', function (err, contents) {
      if (err) {
        console.error(err)
        process.exit(1);
      }

      program.ports.receiveFileContents.send(contents)
    });

  });
}