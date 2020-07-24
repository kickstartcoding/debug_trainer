import {
  runBreakCommand,
  createTestFileWithContent,
  readTestFile,
  clearSaveFile
} from './testHelpers.js'

describe("break command", () => {
  afterEach(() => { clearSaveFile() })

  describe("case swapping", () => {
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

  describe("return statement removal", () => {
    test("removes a return statement", () => {
      createTestFileWithContent(' return ')
      runBreakCommand()

      expect(readTestFile()).toEqual(' ')
    })
  })

  describe("function args fuckery", () => {
    test("removes arg from single argument function declaration", () => {
      createTestFileWithContent(' function functionName(arg1) ')
      runBreakCommand()

      expect(readTestFile()).toEqual(' function functionName() ')
    })
    
    test("adds 'num' argument to no-argument function declaration", () => {
      createTestFileWithContent(' function functionName() ')
      runBreakCommand()

      expect(readTestFile()).toEqual(' function functionName(num) ')
    })

    test("swaps first two arguments of two-argument function declaration", () => {
      createTestFileWithContent(' function functionName(arg1, arg2) ')
      runBreakCommand()

      expect(readTestFile()).toEqual(' function functionName(arg2, arg1) ')
    })

    test("swaps first two arguments of three-argument function declaration", () => {
      createTestFileWithContent(' function functionName(arg1, arg2, arg3) ')
      runBreakCommand()

      expect(readTestFile()).toEqual(' function functionName(arg2, arg1, arg3) ')
    })
  })
})