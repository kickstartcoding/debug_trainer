module.exports = function (program) {
  program.ports.printAndExitFailure.subscribe(message => {
    console.log(message);
    process.exit(1);
  });
}