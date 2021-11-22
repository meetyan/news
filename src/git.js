const path = require('path')
const simpleGit = require('simple-git')

const { writeJSON, getTodaysDate } = require('./common')
const { CATEGORY_MAP } = require('./constants')

const git = simpleGit()

const save = ({ category, result, suffix }) => {
  const today = getTodaysDate()
  writeJSON(
    `./results/${category}/${today}${suffix && '-' + suffix}.json`,
    result
  )
  writeJSON(
    `./results/${category}/latest${suffix && '-' + suffix}.json`,
    result
  )
}

const push = async ({ category, result, suffix }) => {
  save({ category, result, suffix })
  const today = getTodaysDate()

  try {
    await git.pull()
    await git
      .init()
      .add(
        path.join(
          __dirname,
          `./results/${category}/${today}${suffix && '-' + suffix}.json`
        )
      )
      .add(
        path.join(
          __dirname,
          `./results/${category}/latest${suffix && '-' + suffix}.json`
        )
      )
      .commit(`feat: update ${CATEGORY_MAP[category]}`)
      .push()
  } catch (error) {
    console.log('error - ', error.toString())
  }
}

module.exports = { push }
