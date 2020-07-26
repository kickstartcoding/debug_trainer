import {
  runBreakCommand,
  runErrorTypeHintCommand,
  createTestFileWithContent,
  readTestFile,
  clearTestFile,
  clearSaveFile
} from './testHelpers'
import { format } from '../js/utils'

describe("error-type-hint command", () => {
  afterEach(() => { clearSaveFile(); clearTestFile() })

  test("gives an error description for a broken file", () => {
    createTestFileWithContent('Test')
    runBreakCommand()
    const output = runErrorTypeHintCommand()

    expect(output).toEqual(expect.stringContaining(
      format('HINT: somewhere in this file, `debug_trainer` changed a word from starting with a capital letter to starting with a lowercase letter or vice versa.')
    ))
  })

  test("provides descriptions of multiple errors if multiple errors were introduced", () => {
    createTestFileWithContent('{\n return  function functionName(arg1, arg2) }\n')
    runBreakCommand(4)

    const output = runErrorTypeHintCommand()

    expect(output).toEqual(expect.stringContaining(
      format("`1 time` in file: somewhere in this file, `debug_trainer` removed a `return` keyword from a function.")
    ))
    expect(output).toEqual(expect.stringContaining(
      format("`2 times` in file: somewhere in this file, `debug_trainer` removed an opening or closing parenthesis or bracket.")
    ))
    expect(output).toEqual(expect.stringContaining(
      format("`1 time` in file: somewhere in this file, `debug_trainer` changed the arguments to a function.")
    ))
  })

  test("does not give a hint for an UNBROKEN file", () => {
    createTestFileWithContent('whatever')
    const output = runErrorTypeHintCommand()

    expect(output).toEqual(expect.stringContaining('has no record of'))
    expect(output).toEqual(expect.stringContaining('being changed'))
  })
})