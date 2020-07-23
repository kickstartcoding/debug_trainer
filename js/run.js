/* Explanation for this weird run/runTest file dichotomy in main.js */
import { Elm } from '../elm/Main.elm'
import Main from './main.js'

export default function () { Main.run(Elm) }
