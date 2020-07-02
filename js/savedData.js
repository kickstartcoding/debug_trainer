fs = require('fs')

const homedir = require('os').homedir();

const saveDataFilePath = `${homedir}/.debug_trainer.json`

module.exports = {
  load: function (program) {
    console.log(`Loading data from ${saveDataFilePath}...`);
    if (fs.existsSync(saveDataFilePath)) {
      return fs.readFileSync(saveDataFilePath, 'utf8');
    } else {
      return null
    }
  },
  save: function (saveDataContents) {
    console.log(`Saving data to ${saveDataFilePath}...`);
    if (!fs.existsSync(saveDataFilePath)) {
      fs.closeSync(fs.openSync(saveDataFilePath, 'w'))
    }
    const contents = JSON.stringify(saveDataContents, null, "  ")
    fs.writeFile(saveDataFilePath, contents, function (err) {
      // console.log('contents:', contents)

      if (err) {
        console.log(err)
        process.exit(1);
      }
      console.log('Data successfully saved!');

      process.exit(0);
    });
  }
}