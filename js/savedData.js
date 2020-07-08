import fs from 'fs'
import os from 'os'
import { devLog } from './logging.js'

export const dataFilePath = `${os.homedir()}/.debug_trainer.json`

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
  if (!fs.existsSync(dataFilePath)) {
    fs.closeSync(fs.openSync(dataFilePath, 'w'))
  }
  const contents = JSON.stringify(saveDataContents, null, "  ")
  fs.writeFile(dataFilePath, contents, function (err) {
    // console.log('contents:', contents)

    if (err) {
      console.error(err)
      process.exit(1);
    }
    devLog('Data successfully saved!');

    process.exit(0);
  });
}
