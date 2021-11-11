const cron = require('node-cron')
const moment = require('moment')
const simpleGit = require('simple-git')
const path = require('path')
const { writeJSON } = require('./common')
const githubCrawler = require('./github')

const git = simpleGit()

// Start GitHub trending cron job for every 30th minutes
cron.schedule('1 * * * *', async () => {
  console.log('start')
  const result = await githubCrawler()

  const today = moment().format('YYYY-MM-DD')
  writeJSON(`./results/github/${today}.json`, result)

  await git
    .init()
    .add(path.join(__dirname, `./results/github/${today}.json`))
    .commit('feat: update GitHub trending')
    .push()

  console.log('done')
})
