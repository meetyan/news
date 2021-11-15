const cron = require('node-cron')

const githubCrawler = require('./targets/github-trending')
const weiboHotCrawler = require('./targets/weibo-hot')
const git = require('./git')
const { CATEGORY } = require('./constants')

// Start GitHub trending cron job every hour
cron.schedule('1 * * * *', async () => {
  console.log('Start GitHub trending')

  const result = await githubCrawler()
  await git.push(CATEGORY.GITHUB_TRENDING, result)

  console.log('Done GitHub trending')
})

// Start Weibo hot cron job every half an hour
cron.schedule('*/30 * * * *', async () => {
  console.log('Start Weibo hot')

  const result = await weiboHotCrawler()
  await git.push(CATEGORY.WEIBO_HOT, result)

  console.log('Done Weibo hot')
})
