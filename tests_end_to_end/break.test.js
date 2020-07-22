import {
  runBreakCommand,
  createTestFileWithContent,
  readTestFile,
  clearSaveFile
} from './testHelpers.js'

describe("break command", () => {
  describe("case swapping", () => {
    // beforeEach(() => {  })
    afterEach(() => { clearSaveFile() })

    test("lowercases a title case word", () => {
      createTestFileWithContent('Test')
      runBreakCommand()

      expect(readTestFile()).toEqual('test')
    })

    test("uppercases a lower case word", () => {
      createTestFileWithContent('test')
      runBreakCommand()

      expect(readTestFile()).toEqual('Test')
    })

    test("will not break same file twice", () => {
      createTestFileWithContent('test')
      runBreakCommand()
      const output = runBreakCommand()

      expect(readTestFile()).toEqual('Test')
      expect(output).toEqual(expect.stringContaining('has already had a change introduced'))
    })
  })
})