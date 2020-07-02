fs = require('fs')

module.exports = function (program) {
  program.ports.readFile.subscribe(filepath => {
    console.log(`Reading contents of ${filepath}...`);
    fs.readFile(filepath, 'utf8', function (err, contents) {
      if (err) {
        console.log(err)
        process.exit(1);
      }
      
      program.ports.receiveFileContents.send(contents)
    });

  });
}