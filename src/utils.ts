import colors from 'colors'

const loggingIsOn: boolean = process.argv.includes('--log') || process.argv.includes('-l')

export function devLog(...messages: string[]): void {
  if (loggingIsOn) {
    messages[0] = `[dev info]: ${messages[0]}`
    formattedLog(...messages)
  }
}


export function formattedLog(...strings: string[]): void {
  console.log(...formatAll(...strings))
}

export function formattedErrorLog(...strings: string[]): void {
  console.error(...formatAll(...strings))
}

export function formatAll(...strings: string[]): string[] {
  return strings.map(format)
}

colors.setTheme({ code: ['bold', 'white', 'bgBlack'] })

export function format(string: string): string {
  return string.split("`").map((segment, index) => {
    if (index % 2 == 0) {
      return segment
    } else {
      return colors.code(segment)
    }
  }).join("")
}