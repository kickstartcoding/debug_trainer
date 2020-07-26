import { formattedErrorLog } from '../utils'

export default function (program): void {
  program.ports.printAndExitFailure.subscribe(message => {
    formattedErrorLog(message)
    process.exit(1)
  })
}