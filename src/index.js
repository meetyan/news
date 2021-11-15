const cron = require('node-cron')

const githubCrawler = require('./targets/github-trending')
const weiboHotCrawler = require('./targets/weibo-hot')
const baiduHotCrawler = require('./targets/baidu-hot')

const git = require('./git')
const { CATEGORY } = require('./constants')

// GitHub trending
cron.schedule('1 * * * *', async () => {
  console.log('Start GitHub trending')

  const result = await githubCrawler()
  await git.push(CATEGORY.GITHUB_TRENDING, result)

  console.log('Done GitHub trending')
})

// Weibo hot
cron.schedule('5 * * * *', async () => {
  console.log('Start Weibo hot')

  const result = await weiboHotCrawler()
  await git.push(CATEGORY.WEIBO_HOT, result)

  console.log('Done Weibo hot')
})

// Baidu hot
cron.schedule('10 * * * *', async () => {
  console.log('Start Baidu hot')

  const result = await baiduHotCrawler()
  await git.push(CATEGORY.BAIDU_HOT, result)

  console.log('Done Baidu hot')
})
