const cron = require('node-cron')

const githubCrawler = require('./github')
const { writeAndPush } = require('./git')

// Start GitHub trending cron job for every hour
cron.schedule('1 * * * *', async () => {
  console.log('Start GitHub trending')

  const result = await githubCrawler()
  await writeAndPush(result)

  console.log('Done GitHub trending')
})
