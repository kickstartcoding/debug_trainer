import {
  runBreakCommand,
  createTestFileWithContent,
  readTestFile,
  clearTestFile,
  clearSaveFile
} from './testHelpers'

describe("break command", () => {
  afterEach(() => { clearSaveFile(); clearTestFile() })

  test("breaks a file", () => {
    createTestFileWithContent('Test')
    runBreakCommand()

    expect(readTestFile()).toEqual('test')
  })

  test("breaks a file with a bracket", () => {
    createTestFileWithContent('\n{')
    runBreakCommand()

    expect(readTestFile()).toEqual('\n')
  })

  test("will not break same file twice", () => {
    createTestFileWithContent('test')
    runBreakCommand()
    const output = runBreakCommand()

    expect(readTestFile()).toEqual('Test')
    expect(output).toEqual(expect.stringContaining('has already had a change introduced'))
  })
})