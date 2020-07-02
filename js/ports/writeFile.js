fs = require('fs')

module.exports = function (program) {
  program.ports.writeFile.subscribe(fileData => {
    console.log(`Writing new contents of ${fileData.path}...`);
    fs.writeFile(fileData.path, fileData.contents, function (err) {
      if (err) {
        console.log(err)
        process.exit(1);
      }
      console.log('New contents written! Good luck debugging!');
      process.exit(0);
    });
  });
}