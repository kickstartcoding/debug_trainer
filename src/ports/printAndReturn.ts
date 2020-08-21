import { formattedLog } from '../utils'

export default function (program): void {
  program.ports.printAndReturn.subscribe(message => {
    formattedLog(message)
    program.ports.finishedPrinting.send(message)
  })
}