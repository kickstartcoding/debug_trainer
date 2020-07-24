import {
  runBreakCommand,
  runErrorTypeHintCommand,
  createTestFileWithContent,
  readTestFile,
  clearTestFile,
  clearSaveFile
} from './testHelpers'

describe("error-type-hint command", () => {
  afterEach(() => { clearSaveFile(); clearTestFile() })

  test("gives an error description for a broken file", () => {
    createTestFileWithContent('Test')
    runBreakCommand()
    const output = runErrorTypeHintCommand()

    expect(output).toEqual(expect.stringContaining('HINT: Somewhere in this file, debug_trainer changed a word from starting with a capital letter to starting with a lowercase letter or vice versa.'))
  })

  test("does not give a hint for an UNBROKEN file", () => {
    createTestFileWithContent('whatever')
    const output = runErrorTypeHintCommand()

    expect(output).toEqual(expect.stringContaining('has no record of'))
    expect(output).toEqual(expect.stringContaining('being changed'))
  })
})