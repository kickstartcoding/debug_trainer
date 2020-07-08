export function devLog(...messages) {
  if (process.argv.includes('--log') || process.argv.includes('-l')) {
    messages[0] = `[dev info]: ${messages[0]}`
    console.log(...messages)
  }
}