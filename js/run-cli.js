const { Elm } = require('./elm.js')
const readline = require('readline')
const print = require('./ports/print.js')
const printAndExitFailure = require('./ports/printAndExitFailure.js')
const printAndExitSuccess = require('./ports/printAndExitSuccess.js')
const readFile = require('./ports/readFile.js')
const writeFile = require('./ports/writeFile.js')

global.XMLHttpRequest = require("xhr2")

module.exports = (opts) => {
  const program = Elm.Main.init({
    flags: { argv: process.argv, randomNumber: getRandomInt(1_000_000), versionMessage: "1.2.3" }
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

  if (opts && opts.stdin) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    })

    rl.on('line', function (line) {
      program.ports.onStdinLine.send(line)
    })

    rl.on('close', function (line) {
      program.ports.onStdinClosed.send(null)
    })
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}