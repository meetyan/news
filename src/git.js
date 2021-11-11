const path = require('path')
const moment = require('moment')
const simpleGit = require('simple-git')

const { writeJSON } = require('./common')

const git = simpleGit()

const writeAndPush = async result => {
  const today = moment().format('YYYY-MM-DD')
  writeJSON(`./results/github/${today}.json`, result)

  try {
    await git
      .init()
      .add(path.join(__dirname, `./results/github/${today}.json`))
      .commit('feat: update GitHub trending')
      .push()
  } catch (error) {
    console.log(error.toString())
  }
}

module.exports = { writeAndPush }
