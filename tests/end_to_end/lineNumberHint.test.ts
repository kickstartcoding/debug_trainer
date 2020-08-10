import {
  runBreakCommand,
  runLineNumberHintCommand,
  createTestFileWithContent,
  readTestFile,
  clearTestFile,
  clearSaveFile
} from './testHelpers'
import { format } from '../../src/utils'

describe("error-type-hint command", () => {
  afterEach(() => { clearSaveFile(); clearTestFile() })

  test("gives a line number hint for a broken file", () => {
    createTestFileWithContent('Test')
    runBreakCommand()
    const output = runLineNumberHintCommand()

    expect(output).toEqual(expect.stringContaining(
      format('HINT: The line where the change was made was `line 1` of the original file.')
    ))
  })

  test("does not give a hint for an UNBROKEN file", () => {
    createTestFileWithContent('whatever')
    const output = runLineNumberHintCommand()

    expect(output).toEqual(expect.stringContaining('has no record of'))
    expect(output).toEqual(expect.stringContaining('being changed'))
  })

  test("gives the correct line number for bracket removals without preceding whitespace", () => {
    createTestFileWithContent(' { \n\n')
    runBreakCommand()
    const output = runLineNumberHintCommand()

    expect(output).toEqual(expect.stringContaining(
      format('HINT: The line where the change was made was `line 1` of the original file.')
    ))
  })

  test("gives the correct line number for bracket removals with preceding whitespace", () => {
    createTestFileWithContent('\n\n { ')
    runBreakCommand()
    const output = runLineNumberHintCommand()

    expect(output).toEqual(expect.stringContaining(
      format('HINT: The line where the change was made was `line 3` of the original file.')
    ))
  })

  test("gives the correct line number for function declarations without preceding whitespace", () => {
    createTestFileWithContent('function hello(arg1) ')
    runBreakCommand()
    const output = runLineNumberHintCommand()

    expect(output).toEqual(expect.stringContaining(
      format('HINT: The line where the change was made was `line 1` of the original file.')
    ))
  })

  test("gives the correct line number for function declarations with preceding whitespace", () => {
    createTestFileWithContent('\n\nfunction hello(arg1) ')
    runBreakCommand()
    const output = runLineNumberHintCommand()

    expect(output).toEqual(expect.stringContaining(
      format('HINT: The line where the change was made was `line 3` of the original file.')
    ))
  })


  test("a full list of line numbers if multiple errors were introduced", () => {
    createTestFileWithContent('{\n return  function functionName(arg1, arg2) }\n')
    runBreakCommand(4)

    const output = runLineNumberHintCommand()

    expect(output).toEqual(expect.stringContaining(
      format("Changes were made on these lines of the original file: `1, 2`")
    ))
  })
})