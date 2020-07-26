import {
  runBreakCommand,
  createTestFileWithContent,
  readTestFile,
  clearTestFile,
  clearSaveFile
} from './testHelpers'

describe("break command", () => {
  afterEach(() => { clearSaveFile(); clearTestFile() })

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

  describe("parenthesis/bracket removal", () => {
    for (const bracketThingy of ["(", ")", "{", "}", "[", "]"]) {
      test(`removes a ${bracketThingy} from the beginning of a line`, () => {
        createTestFileWithContent(`\n${bracketThingy}`)
        runBreakCommand()

        expect(readTestFile()).toEqual("\n")
      })

      test(`removes a ${bracketThingy} from the end of a line`, () => {
        createTestFileWithContent(`${bracketThingy}\n`)
        runBreakCommand()

        expect(readTestFile()).toEqual("\n")
      })
    }
  })

  describe("function args fuckery", () => {
    test("removes arg from single argument function declaration", () => {
      createTestFileWithContent(' function functionName(arg1) ')
      runBreakCommand()

      expect(readTestFile()).toEqual(' function functionName() ')
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

  describe("dot-access removal", () => {
    test(`removes dot access`, () => {
      createTestFileWithContent(`thing1.thing2.thing3`)
      runBreakCommand()

      const correctBreaks = ["thing1.thing2", "thing1.thing3", "thing2.thing3"]

      expect(correctBreaks.includes(readTestFile())).toBeTruthy()
    })
  })

  describe("multi-error breaking", () => {
    test(`causes specified number of errors`, () => {
      createTestFileWithContent(`hey ho hi`)
      runBreakCommand(3)

      expect(readTestFile()).toEqual("Hey Ho Hi")
    })

    test(`gives up on more errors if no possible errors left`, () => {
      createTestFileWithContent(`hey ho hi`)
      runBreakCommand(9999)

      expect(readTestFile()).toEqual("Hey Ho Hi")
    })
  })
})