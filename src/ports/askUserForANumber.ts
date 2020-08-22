import * as inquirer from 'inquirer'
import { devLog, formattedErrorLog } from '../utils'

export default function (program): void {
  program.ports.askUserForANumber.subscribe(({ name, message, max, min }: {
    name: string,
    message: string,
    max: number,
    min: number
  }): void => {
    inquirer
      .prompt([
        {
          type: "number",
          name: name,
          message: message,
          validate: (input) => {
            return new Promise(function (resolve, reject) {
              if (input >= min && input <= max) {
                resolve(true)
              } else {
                reject(`Input must be at least ${min} and no more than ${max}.`)
              }
            })
          },
          default: 1
        }
      ])
      .then((answers) => {
        program.ports.receiveUserNumberChoice.send(answers[name])
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
