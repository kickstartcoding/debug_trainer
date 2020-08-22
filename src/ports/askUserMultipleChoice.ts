import * as inquirer from 'inquirer'
import { devLog, formattedErrorLog } from '../utils'

export default function (program): void {
  program.ports.askUserMultipleChoice.subscribe(({ name, message, options }: { name: string, message: string, options: string[] }): void => {
    inquirer
      .prompt([
        {
          type: "rawlist",
          name: name,
          message: message,
          default: "",
          choices: options
        }
      ])
      .then((answers) => {
        program.ports.receiveUserAnswer.send(answers[name])
      })
      .catch(error => {
        if (error.isTtyError) {
          formattedErrorLog("Prompt couldn't be rendered in the current environment.")
          process.exit(1)
        } else {
          formattedErrorLog(`Something weird went wrong:\n\n${error}`)
          process.exit(1)
        }
      });


  })
}
