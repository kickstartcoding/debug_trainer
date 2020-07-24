// @ts-ignore
import { Elm } from '../elm/Main.elm'
import print from './ports/print'
import printAndExitFailure from './ports/printAndExitFailure'
import printAndExitSuccess from './ports/printAndExitSuccess'
import readFile from './ports/readFile'
import writeFile from './ports/writeFile'
import exitSuccess from './ports/exitSuccess'
import * as SavedData from './savedData'
import { devLog } from './logging'

export function run(): void {
  const data: string = SavedData.load()
  devLog('process.argv:', ...process.argv)
  devLog('data:', data)

  const program = Elm.Main.init({
    flags: {
      argv: process.argv,
      randomNumber1: getRandomInt(1_000_000),
      randomNumber2: getRandomInt(1_000_000),
      dataFilePath: SavedData.dataFilePath,
      workingDirectory: process.cwd(),
      data: data,
      versionMessage: "4.0.0"
    }
  })

  const portFunctions: ((arg0: any) => any)[] = [
    print,
    printAndExitFailure,
    printAndExitSuccess,
    exitSuccess,
    readFile,
    writeFile
  ]

  portFunctions.forEach(function (portSetupFunction) {
    portSetupFunction(program)
  })
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}