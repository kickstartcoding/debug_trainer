import print from './ports/print.js'
import printAndExitFailure from './ports/printAndExitFailure.js'
import printAndExitSuccess from './ports/printAndExitSuccess.js'
import readFile from './ports/readFile.js'
import writeFile from './ports/writeFile.js'
import * as SavedData from './savedData.js'
import { devLog } from './logging.js'

/*
Why pass in this Elm variable this way instead of importing
directly?

Passing in the Elm object here is a trick we need to do so that
the Elm code will work with both Parcel for production and Jest
for testing. Parcel compiles from run.js, which compiles Elm
with an `import` statement. Jest compiles it from run_test.js,
which compiles it by calling functions from node-elm-compiler
directly. It's weird but it works.
*/
export function run(Elm) {
  const data = SavedData.load()
  devLog('process.argv:', process.argv)
  devLog('data:', data)

  const program = Elm.Main.init({
    flags: {
      argv: process.argv,
      randomNumber1: getRandomInt(1_000_000),
      randomNumber2: getRandomInt(1_000_000),
      dataFilePath: SavedData.dataFilePath,
      workingDirectory: process.cwd(),
      data: data,
      versionMessage: "3.0.2"
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