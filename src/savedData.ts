import * as fs from 'fs'
import * as os from 'os'
import { devLog } from './utils'

export const testDataFileName: string = "debug_trainer_test_save_file.json"

export const dataFilePath: string = process.argv.includes('--test') ?
  testDataFileName : `${os.homedir()}/.debug_trainer.json`

export function load(): string | null {
  devLog(`Loading data from ${dataFilePath}...`);
  if (fs.existsSync(dataFilePath)) {
    return fs.readFileSync(dataFilePath, 'utf8');
  } else {
    return null
  }
}
