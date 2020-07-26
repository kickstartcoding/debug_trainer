import {
  runBreakCommand,
  runExplainCommand,
  createTestFileWithContent,
  readTestFile,
  clearTestFile,
  clearSaveFile
} from './testHelpers'

describe('explain command', () => {
  afterEach(() => { clearSaveFile(); clearTestFile() })

  test("explains case swaps", () => {
    createTestFileWithContent('Test')
    runBreakCommand()

    const output = runExplainCommand()

    expect(output).toEqual(expect.stringContaining(
      'changed `Test` to `test` on line 1 of the original file'
    ))
  })

  test("explains function arg removals", () => {
    createTestFileWithContent(' function functionName(arg1) ')
    runBreakCommand()

    const output = runExplainCommand()

    expect(output).toEqual(expect.stringContaining(
      'removed the `arg1` argument from `functionName` on line 1 of the original file'
    ))
  })

  test("explains function arg swaps", () => {
    createTestFileWithContent(' function functionName(arg1, arg2) ')
    runBreakCommand()

    const output = runExplainCommand()

    expect(output).toEqual(expect.stringContaining(
      'switched the positions of `arg1` and `arg2` in `functionName` on line 1 of the original file'
    ))
  })

  test("explains return removals", () => {
    createTestFileWithContent(' return ')
    runBreakCommand()

    const output = runExplainCommand()

    expect(output).toEqual(expect.stringContaining(
      'removed a `return` on line 1 of the original file'
    ))
  })

  test("explains bracket removals at the start of a line", () => {
    createTestFileWithContent('\n{')
    runBreakCommand()

    const output = runExplainCommand()

    expect(output).toEqual(expect.stringContaining(
      'removed a `{` from the beginning of the line on line 2 of the original file'
    ))
  })

  test("explains bracket removals at the end of a line", () => {
    createTestFileWithContent('{\n')
    runBreakCommand()

    const output = runExplainCommand()

    expect(output).toEqual(expect.stringContaining(
      'removed a `{` from the end of the line on line 1 of the original file'
    ))
  })

  test(`explains dot-access removal`, () => {
    createTestFileWithContent(`thing1.thing2.thing3`)
    runBreakCommand()
    const output = runExplainCommand()

    const correctExplanations = [
      "changed `thing1.thing2.thing3` to `thing1.thing2` on line 1 of the original file",
      "changed `thing1.thing2.thing3` to `thing1.thing3` on line 1 of the original file",
      "changed `thing1.thing2.thing3` to `thing2.thing3` on line 1 of the original file",
    ]

    expect(correctExplanations.includes(output.trim())).toBeTruthy()
  })

  test("explains multiple errors if multiple errors were introduced", () => {
    createTestFileWithContent('{\n return  function functionName(arg1, arg2) ')
    runBreakCommand(3)

    const output = runExplainCommand()

    expect(output).toEqual(expect.stringContaining(
      "removed a `{` from the end of the line on line 1 of the original file"
    ))
    expect(output).toEqual(expect.stringContaining(
      "removed a `return` on line 2 of the original file"
    ))
    expect(output).toEqual(expect.stringContaining(
      "switched the positions of `arg1` and `arg2` in `functionName` on line 2 of the original file"
    ))
  })

  test("does nothing if file hasn't been broken", () => {
    createTestFileWithContent('Test')
    const output = runExplainCommand()

    expect(readTestFile()).toEqual('Test')
    expect(output).toEqual(expect.stringContaining(
      'Either it has never been changed or the changes that were made have been reverted'
    ))
  })
})