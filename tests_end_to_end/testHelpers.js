import fs from 'fs'
import { execSync } from 'child_process'
import run from '../js/runTest.js'

export const testFileName = "testfile.txt"
export const dataFileName = "debug_trainer_test_save_file.json"

export function runBreakCommand() {
  return runCommand(["break", testFileName])
}

export function runHintCommand(hintNumber) {
  if (hintNumber) {
    return runCommand(["hint", "--hintNumber", "2", testFileName])
  } else {
    return runCommand(["hint", testFileName])
  }
}

export function runResetCommand() {
  return runCommand(["reset", testFileName])
}

function runCommand(commands) {
  process.argv = ["node", "./bin/debug_trainer"].concat(commands).concat(["--test"])

  return run()
  // return execSync(`node ./bin/debug_trainer ${command} --test`).toString()
}

export function createTestFileWithContent(content) {
  fs.writeFileSync(testFileName, content, function (err) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  })
}

export function readTestFile() {
  return fs.readFileSync(testFileName, 'utf8')
}

export function clearSaveFile() {
  if (fs.existsSync(dataFileName)) {
    fs.unlinkSync(dataFileName)
  }
}