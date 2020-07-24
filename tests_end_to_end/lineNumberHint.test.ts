import {
  runBreakCommand,
  runLineNumberHintCommand,
  createTestFileWithContent,
  readTestFile,
  clearTestFile,
  clearSaveFile
} from './testHelpers'

describe("error-type-hint command", () => {
  afterEach(() => { clearSaveFile(); clearTestFile() })

  test("gives a line number hint for a broken file", () => {
    createTestFileWithContent('Test')
    runBreakCommand()
    const output = runLineNumberHintCommand()

    expect(output).toEqual(expect.stringContaining('HINT: The line where the change was made was line 1 of the original file.'))
  })

  test("does not give a hint for an UNBROKEN file", () => {
    createTestFileWithContent('whatever')
    const output = runLineNumberHintCommand()

    expect(output).toEqual(expect.stringContaining('has no record of'))
    expect(output).toEqual(expect.stringContaining('being changed'))
  })
})