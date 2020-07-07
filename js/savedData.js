fs = require('fs')

const homedir = require('os').homedir();
const { devLog } = require('./logging.js')

const dataFilePath = `${homedir}/.debug_trainer.json`

module.exports = {
  dataFilePath: dataFilePath,
  load: function (program) {
    devLog(`Loading data from ${dataFilePath}...`);
    if (fs.existsSync(dataFilePath)) {
      return fs.readFileSync(dataFilePath, 'utf8');
    } else {
      return null
    }
  },
  save: function (saveDataContents) {
    devLog(`Saving data to ${dataFilePath}...`);
    if (!fs.existsSync(dataFilePath)) {
      fs.closeSync(fs.openSync(dataFilePath, 'w'))
    }
    const contents = JSON.stringify(saveDataContents, null, "  ")
    fs.writeFile(dataFilePath, contents, function (err) {
      // console.log('contents:', contents)

      if (err) {
        console.error(err)
        process.exit(1);
      }
      devLog('Data successfully saved!');

      process.exit(0);
    });
  }
}