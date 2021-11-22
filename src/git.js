const path = require('path')
const simpleGit = require('simple-git')

const { writeJSON, getTodaysDate } = require('./common')
const { CATEGORY_MAP } = require('./constants')

const git = simpleGit()

const setJSONPath = (category, suffix) => {
  const today = getTodaysDate()
  suffix = suffix ? '-' + suffix : ''
  const withDate = `./results/${category}/${today}${suffix}.json`
  const latest = `./results/${category}/latest${suffix}.json`

  return { withDate, latest }
}

const save = ({ category, result, suffix }) => {
  const { withDate, latest } = setJSONPath(category, suffix)
  writeJSON(withDate, result)
  writeJSON(latest, result)
}

const push = async ({ category, result, suffix = '' } = {}) => {
  save({ category, result, suffix })
  const { withDate, latest } = setJSONPath(category, suffix)

  try {
    await git.pull()
    await git
      .init()
      .add(path.join(__dirname, withDate))
      .add(path.join(__dirname, latest))
      .commit(`feat: update ${CATEGORY_MAP[category]}`)
      .push()
  } catch (error) {
    console.log('error - ', error.toString())
  }
}

module.exports = { push }
