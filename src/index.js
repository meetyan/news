const cron = require('node-cron')

const githubCrawler = require('./github')
const git = require('./git')
const { CATEGORY } = require('./constants')

// Start GitHub trending cron job for every hour
cron.schedule('1 * * * *', async () => {
  console.log('Start GitHub trending')

  const result = await githubCrawler()
  await git.push(CATEGORY.GITHUB_TRENDING, result)

  console.log('Done GitHub trending')
})
