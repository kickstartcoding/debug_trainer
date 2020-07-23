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

  test("gives a second, more specific hint for a broken file if the number 2 is passed", () => {
    createTestFileWithContent('Test')
    runBreakCommand()
    const output = runHintCommand(2)

    expect(output).toEqual(expect.stringContaining('HINT: The change that was made to this file was made on line 1.'))
  })

  test("does not give a hint for an UNBROKEN file", () => {
    createTestFileWithContent('whatever')
    const output = runHintCommand()

    expect(output).toEqual(expect.stringContaining('has no record of'))
    expect(output).toEqual(expect.stringContaining('being changed'))
  })
})