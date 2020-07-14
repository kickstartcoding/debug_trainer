import { Elm } from '../elm/Main.elm'
import print from './ports/print.js'
import printAndExitFailure from './ports/printAndExitFailure.js'
import printAndExitSuccess from './ports/printAndExitSuccess.js'
import readFile from './ports/readFile.js'
import writeFile from './ports/writeFile.js'
import * as SavedData from './savedData.js'
import { devLog } from './logging.js'

run()

function run() {
  const data = SavedData.load()
  devLog('data:', data)

  const program = Elm.Main.init({
    flags: {
      argv: process.argv,
      randomNumber1: getRandomInt(1_000_000),
      randomNumber2: getRandomInt(1_000_000),
      dataFilePath: SavedData.dataFilePath,
      workingDirectory: process.cwd(),
      data: data,
      versionMessage: "3.0.0"
    }
  })

  const portFunctions = [
    print,
    printAndExitFailure,
    printAndExitSuccess,
    readFile,
    writeFile
  ]

  portFunctions.forEach(function (portSetupFunction) {
    portSetupFunction(program)
  })
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}