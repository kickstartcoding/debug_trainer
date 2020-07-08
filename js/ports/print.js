export default function (program) {
  program.ports.print.subscribe(message => {
    console.log(message)
  });
}