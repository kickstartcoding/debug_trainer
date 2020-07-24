const loggingIsOn: boolean = process.argv.includes('--log') || process.argv.includes('-l')

export function devLog(...messages: string[]): void {
  if (loggingIsOn) {
    messages[0] = `[dev info]: ${messages[0]}`
    console.log(...messages)
  }
}