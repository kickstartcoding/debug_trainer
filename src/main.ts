// @ts-ignore
import { Elm } from './elm/Main.elm'
import print from './ports/print'
import printAndExitFailure from './ports/printAndExitFailure'
import printAndExitSuccess from './ports/printAndExitSuccess'
import printAndReturn from './ports/printAndReturn'
import readFile from './ports/readFile'
import writeFile from './ports/writeFile'
import askUserMultipleChoice from './ports/askUserMultipleChoice'
import askUserForANumber from './ports/askUserForANumber'
import chooseRandomFile from './ports/chooseRandomFile'
import exitSuccess from './ports/exitSuccess'
import * as SavedData from './savedData'
import { devLog } from './utils'

export function run(): void {
  const data: string = SavedData.load()
  devLog('process.argv:', ...process.argv)
  devLog('data:', data)

  const program = Elm.Main.init({
    flags: {
      argv: process.argv,
      randomNumbers: getRandomInts(1_000_000, 20),
      dataFilePath: SavedData.dataFilePath,
      workingDirectory: process.cwd(),
      data: data,
      versionMessage: "6.6.2"
    }
  })

  const portFunctions: ((arg0: any) => any)[] = [
    print,
    printAndExitFailure,
    printAndExitSuccess,
    // exitSuccess,
    askUserMultipleChoice,
    askUserForANumber,
    chooseRandomFile,
    printAndReturn,
    readFile,
    writeFile
  ]

  portFunctions.forEach(function (portSetupFunction) {
    portSetupFunction(program)
  })
}

function getRandomInts(max: number, count: number): number[] {
  return [...Array(count)].map(val => getRandomInt(max))
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}