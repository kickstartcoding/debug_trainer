
const { compileToString } = require('node-elm-compiler')


module.exports = async function runElm(path) {
    const warnOriginal = console.warn;
    console.warn = function () { };

    const elmSource = await compileToString([path], {})
    eval(elmSource.toString())

    return new Promise(function (resolve, reject) {
        const app = Elm.Main.init({ flags: null });

        app.ports.snapshot.subscribe((snapshotValue) => {
            console.warn = warnOriginal;
            resolve(snapshotValue)
        })
    })
}