import * as fs from 'fs'
import * as inquirer from 'inquirer'
import { devLog, formattedErrorLog } from '../utils'

export default function (program): void {
  program.ports.askUser.subscribe((fileData: { question: string, options: string[] }): void => {

    inquirer
      .prompt([
        {
          type: "rawlist",
          message: "stuff",
          default: "",
          choices: []
        }
      ])
      .then(answers => {
        // Use user feedback for... whatever!!
        program.ports.successfulFileWrite.send(fileData)
      })
      .catch(error => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else when wrong
        }
      });


  })
}
