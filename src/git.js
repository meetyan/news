const path = require('path')
const simpleGit = require('simple-git')

const { writeJSON, getTodaysDate } = require('./common')
const { CATEGORY_MAP } = require('./constants')

const git = simpleGit()

const save = (category, result) => {
  const today = getTodaysDate()
  writeJSON(`./results/${category}/${today}.json`, result)
}

const push = async (category, result) => {
  save(category, result)
  const today = getTodaysDate()

  try {
    await git.pull()
    await git
      .init()
      .add(path.join(__dirname, `./results/${category}/${today}.json`))
      .commit(`feat: update ${CATEGORY_MAP[category]}`)
      .push()
  } catch (error) {
    console.log(error.toString())
  }
}

module.exports = { push }
