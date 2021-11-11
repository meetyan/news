const githubCrawler = require('./github')

;(async () => {
  const res = await githubCrawler()

  console.log(res)
})()
