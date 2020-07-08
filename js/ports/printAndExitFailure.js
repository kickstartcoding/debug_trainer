export default function (program) {
  program.ports.printAndExitFailure.subscribe(message => {
    console.error(message);
    process.exit(1);
  });
}