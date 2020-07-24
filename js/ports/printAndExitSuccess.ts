export default function (program): void {
  program.ports.printAndExitSuccess.subscribe(message => {
    console.log(message)
    process.exit(0)
  })
}