fs = require('fs')
const savedData = require('../savedData.js')

module.exports = function (program) {
  program.ports.writeFile.subscribe(fileData => {
    console.log(`Writing new contents of ${fileData.path}...`);
    fs.writeFile(fileData.path, fileData.contents, function (err) {
      if (err) {
        console.log(err)
        process.exit(1);
      }

      console.log('New file contents written!');
      savedData.save(fileData.dataToSave)

      // console.log('Good luck debugging!');
      // process.exit(0);
    });
  });
}
