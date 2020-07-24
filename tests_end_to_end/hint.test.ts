import {
  runBreakCommand,
  runHintCommand,
  createTestFileWithContent,
  readTestFile,
  clearTestFile,
  clearSaveFile
} from './testHelpers'

describe("hint command", () => {
  afterEach(() => { clearSaveFile(); clearTestFile() })

  test("gives a hint for a broken file", () => {
    createTestFileWithContent('Test')
    runBreakCommand()
    const output = runHintCommand()

    expect(output).toEqual(expect.stringContaining('HINT: Somewhere in this file, debug_trainer changed a word from starting with a capital letter to starting with a lowercase letter or vice versa.'))
  })

  test("gives the same default hint when `--hint-number 1` flag is passed", () => {
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

  test("Errors when a bad hint number is passed", () => {
    createTestFileWithContent('Test')
    runBreakCommand()
    const output = runHintCommand(9999)

    expect(output).toEqual(expect.stringContaining('You asked for hint number 9999, but you have to choose either hint 1 or 2.'))
  })

  test("does not give a hint for an UNBROKEN file", () => {
    createTestFileWithContent('whatever')
    const output = runHintCommand()

    expect(output).toEqual(expect.stringContaining('has no record of'))
    expect(output).toEqual(expect.stringContaining('being changed'))
  })
})