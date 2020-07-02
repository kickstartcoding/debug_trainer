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
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}