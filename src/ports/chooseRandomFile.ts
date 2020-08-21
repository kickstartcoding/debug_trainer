import { devLog, formattedErrorLog } from '../utils'
import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'

export default function (program): void {
  devLog("Setting up chooseRandomFile port...")
  program.ports.chooseRandomFile.subscribe((): void => {
    devLog("Choosing a random file...")
    const allFiles = getAllFilesRecursive('.')
    const filepath = pickRandom(allFiles)

    devLog(`Chose ${filepath}!`)
    program.ports.receiveFileChoice.send(filepath)
  })
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}


function getIgnoredItems() {
  const ignored = execSync("git clean -ndX").
    toString().
    split("\n").
    filter(str => str).
    map(str => str.replace('Would remove ', ''))
  devLog(`ignored: ${ignored}`)

  return ignored
}

function getAllFilesRecursive(srcpath) {
  const ignored = getIgnoredItems()
  const allDirectories = getDirectoriesRecursive(srcpath, ignored)

  return allDirectories.map(filesInDirectory).flat()
}

function filesInDirectory(directory) {
  return fs.readdirSync(directory).
    filter(isNotHidden).
    map(file => path.join(directory, file)).
    filter(file => fs.statSync(file).isFile()).
    filter(file => ![".md", ".txt", ".map"].includes(path.extname(file)))
}

function getDirectoriesRecursive(srcpath, ignored) {
  return [srcpath, ...getDirectories(srcpath, ignored).map((dir) => getDirectoriesRecursive(dir, ignored)).flat()];
}

function getDirectories(srcpath, ignored) {
  return fs.readdirSync(srcpath).
    filter(isNotHidden).
    filter(dir => {
      return !ignored.some(ignoredItem => {
        return dir.startsWith(ignoredItem) || dir + "/" === ignoredItem
      })
    }).
    map(dir => path.join(srcpath, dir)).
    filter(dir => fs.statSync(dir).isDirectory())
}

function isNotHidden(name) {
  return !name.startsWith('.')
}