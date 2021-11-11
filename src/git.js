const path = require('path')
const moment = require('moment')
const simpleGit = require('simple-git')

const { writeJSON } = require('./common')
const { CATEGORY_MAP } = require('./constants')

const git = simpleGit()

const save = (category, result) => {
  const today = moment().format('YYYY-MM-DD')
  writeJSON(`./results/${category}/${today}.json`, result)
}

const push = async (category, result) => {
  save(category, result)
  const today = moment().format('YYYY-MM-DD')

  try {
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
