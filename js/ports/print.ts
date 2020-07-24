export default function (program): void {
  program.ports.print.subscribe(message => {
    console.log(message)
  })
}