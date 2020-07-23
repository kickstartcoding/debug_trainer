/* Explanation for this weird run/runTest file dichotomy in main.js */
import { compileToStringSync } from 'node-elm-compiler'
import Main from './main.js'

const compiledElm = noWarnings(() => compileToStringSync(['./elm/Main.elm'], {}))

const Elm = eval(compiledElm)

console.log('Main:', Main)
console.log('Elm:', Elm)

export default function () { Main.run(Elm) }



function noWarnings(func) {
  const warnOriginal = console.warn
  console.warn = function () { }

  const result = func()

  console.warn = warnOriginal

  return result
}
