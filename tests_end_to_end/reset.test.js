import {
  runBreakCommand,
  runResetCommand,
  createTestFileWithContent,
  readTestFile,
  clearSaveFile
} from './testHelpers.js'

describe('reset command', () => {
  // beforeEach(() => {  })
  afterEach(() => { clearSaveFile() })

  test("resets file to original state", () => {
    createTestFileWithContent('Test')

    runBreakCommand()
    expect(readTestFile()).toEqual('test')
    const output = runResetCommand()
    console.log('output:', output)

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