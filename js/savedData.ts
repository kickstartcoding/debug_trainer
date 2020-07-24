import fs from 'fs'
import os from 'os'
import { devLog } from './logging'
import * as TestHelpers from '../tests_end_to_end/testHelpers'

export const dataFilePath: string = process.argv.includes('--test') ?
  TestHelpers.dataFileName : `${os.homedir()}/.debug_trainer.json`

export function load(): string | null {
  devLog(`Loading data from ${dataFilePath}...`);
  if (fs.existsSync(dataFilePath)) {
    return fs.readFileSync(dataFilePath, 'utf8');
  } else {
    return null
  }
}
