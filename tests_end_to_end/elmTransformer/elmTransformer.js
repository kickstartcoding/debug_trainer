const runElm = require('./run-elm')
const { compileToStringSync } = require('node-elm-compiler')


module.exports = {
  process(src, filename) {
    const warnOriginal = console.warn;
    console.warn = function () { };
    const compiled = compileToStringSync([filename], {})
    console.warn = warnOriginal;

    return compiled
  }
};