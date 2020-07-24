export default function (program): void {
  program.ports.printAndExitFailure.subscribe(message => {
    console.error(message)
    process.exit(1)
  })
}