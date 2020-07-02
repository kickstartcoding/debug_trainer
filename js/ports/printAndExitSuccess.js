module.exports = function (program) {
  program.ports.printAndExitSuccess.subscribe(message => {
    console.log(message);
    process.exit(0);
  });
}