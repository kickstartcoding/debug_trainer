import { formattedLog } from '../utils'

export default function (program): void {
  program.ports.printAndExitSuccess.subscribe(message => {
    formattedLog(message)
    process.exit(0)
  })
}