const loggingIsOn = process.argv.includes('--log') || process.argv.includes('-l')

export function devLog(...messages) {
  if (loggingIsOn) {
    messages[0] = `[dev info]: ${messages[0]}`
    console.log(...messages)
  }
}