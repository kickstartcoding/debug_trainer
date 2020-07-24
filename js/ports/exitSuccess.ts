import fs from 'fs'
import * as SavedData from '../savedData'
import { devLog } from '../logging'

export default function (program): void {
  program.ports.exitSuccess.subscribe((): void => process.exit(0))
}