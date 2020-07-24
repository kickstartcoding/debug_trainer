import fs from 'fs'
import os from 'os'
import { devLog } from './logging.js'
import * as TestHelpers from '../tests_end_to_end/testHelpers.js'

export const dataFilePath = process.argv.includes('--test') ?
  TestHelpers.dataFileName : `${os.homedir()}/.debug_trainer.json`

export function load(program) {
  devLog(`Loading data from ${dataFilePath}...`);
  if (fs.existsSync(dataFilePath)) {
    return fs.readFileSync(dataFilePath, 'utf8');
  } else {
    return null
  }
}

export function save(saveDataContents) {
  devLog(`Saving data to ${dataFilePath}...`);
  createFileIfAbsent(dataFilePath)

  const contents = JSON.stringify(saveDataContents, null, "  ")
  fs.writeFile(dataFilePath, contents, function (err) {
    devLog('Saved data contents:', contents)

    if (err) {
      console.error(err)
      process.exit(1);
    }
    devLog('Data successfully saved!');

    process.exit(0);
  });
}

function createFileIfAbsent(filepath) {
  if (!fs.existsSync(filepath)) {
    fs.closeSync(fs.openSync(filepath, 'w'))
  }

}