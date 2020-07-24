import {
  runBreakCommand,
  runResetCommand,
  createTestFileWithContent,
  readTestFile,
  clearTestFile,
  clearSaveFile
} from './testHelpers'

describe('reset command', () => {
  afterEach(() => { clearSaveFile(); clearTestFile() })

  test("resets file to original state", () => {
    createTestFileWithContent('Test')
    runBreakCommand()

    expect(readTestFile()).toEqual('test')

    runResetCommand()

    expect(readTestFile()).toEqual('Test')
  })

  test("does nothing if file hasn't been broken", () => {
    createTestFileWithContent('Test')
    const output = runResetCommand()

    expect(readTestFile()).toEqual('Test')
    expect(output).toEqual(expect.stringContaining(
      'Either it has never been changed or the changes that were made have been reverted'
    ))
  })
})