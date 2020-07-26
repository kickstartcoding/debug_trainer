import { formattedLog } from '../utils'

export default function (program): void {
  program.ports.print.subscribe(message => {
    formattedLog(message)
  })
}