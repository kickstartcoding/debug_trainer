import {
  runBreakCommand,
  runHintCommand,
  createTestFileWithContent,
  readTestFile,
  clearSaveFile
} from './testHelpers.js'

describe("hint command", () => {
  // beforeEach(() => {  })
  afterEach(() => { clearSaveFile() })

  test("gives a hint for a broken file", () => {
    createTestFileWithContent('Test')
    runBreakCommand()
    const output = runHintCommand()

    expect(output).toEqual(expect.stringContaining('HINT: Somewhere in this file, debug_trainer changed a word from starting with a capital letter to starting with a lowercase letter or vice versa.'))
  })

  test("gives a better hint when `--hint-number 2` flag is passed", () => {
    createTestFileWithContent('Test')
    runBreakCommand()
    const output = runHintCommand(2)

    expect(output).toEqual(expect.stringContaining('HINT: The line where the change was made was line 1 of the original file.'))
  })

  test("does not give a hint for an UNBROKEN file", () => {
    createTestFileWithContent('whatever')
    const output = runHintCommand()

    expect(output).toEqual(expect.stringContaining('has no record of'))
    expect(output).toEqual(expect.stringContaining('being changed'))
  })
})