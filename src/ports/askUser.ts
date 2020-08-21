import * as inquirer from 'inquirer'
import { devLog, formattedErrorLog } from '../utils'

export default function (program): void {
  devLog("ports:", JSON.stringify(program.ports))
  program.ports.askUser.subscribe(({ question, options }: { question: string, options: string[] }): void => {
    inquirer
      .prompt([
        {
          type: "rawlist",
          name: question,
          default: "",
          choices: options
        }
      ])
      .then((answers) => {
        program.ports.receiveUserAnswer.send(answers[question])
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
