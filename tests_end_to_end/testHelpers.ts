import fs from 'fs'
import { execSync } from 'child_process'

export const testFileName: string = "testfile.txt"
export const dataFileName: string = "debug_trainer_test_save_file.json"

export function runBreakCommand(errorCount?: number): string {
  if (errorCount) {
    return runCommand(`break --count ${errorCount} ${testFileName}`)
  } else {
    return runCommand(`break ${testFileName}`)
  }
}

export function runErrorTypeHintCommand(): string {
  return runCommand(`error-type-hint ${testFileName}`)
}

export function runLineNumberHintCommand(): string {
  return runCommand(`line-hint ${testFileName}`)
}

export function runExplainCommand(): string {
  return runCommand(`explain ${testFileName}`)
}

export function runResetCommand(): string {
  return runCommand(`reset ${testFileName}`)
}

function runCommand(command: string): string {
  return execSync(`node ./bin/debug_trainer ${command} --test`).toString()
}

export function createTestFileWithContent(content: string): void {
  fs.writeFileSync(testFileName, content)
}

export function readTestFile(): string {
  return fs.readFileSync(testFileName, 'utf8')
}

export function clearSaveFile(): void {
  if (fs.existsSync(dataFileName)) {
    fs.unlinkSync(dataFileName)
  }
}

export function clearTestFile(): void {
  if (fs.existsSync(testFileName)) {
    fs.unlinkSync(testFileName)
  }
}