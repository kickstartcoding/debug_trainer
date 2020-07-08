const loggingIsOn = false

export function devLog(logString) {
  if (loggingIsOn) {
    console.log(logString)
  }
}