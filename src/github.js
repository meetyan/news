const axios = require('axios')
const cheerio = require('cheerio')
const moment = require('moment')

const urlsByLanguage = [
  {
    language: 'default',
    url: 'https://github.com/trending',
  },
  {
    language: 'javascript',
    url: 'https://github.com/trending/javascript?since=daily',
  },
  { language: 'python', url: 'https://github.com/trending/python?since=daily' },
]

const { loadLocal, writeJSON, sleep } = require('./common')
// const source = loadLocal('./sample/index.html')

const crawl = async url => {
  const { data: source } = await axios.get(url)
  const $ = cheerio.load(source)

  const target = $('.Box-row')
    .get()
    .map(repo => {
      const url = $(repo).find('.h3 a').first().attr('href').substr(1)
      const [author, name] = url.split('/')
      const description = $(repo).find('p').text().trim()
      const language = $(repo).find('.f6 .d-inline-block span').text()

      const [stars, forked] = $(repo)
        .find('.f6 a')
        .get()
        .map(item => $(item).text().trim())

      const builtBy = $(repo)
        .find('.f6 .d-inline-block a img')
        .get()
        .map(item => ({
          name: $(item).attr('alt'),
          avatar: $(item).attr('src'),
        }))

      const starsToday = $(repo)
        .find('.f6 .d-inline-block')
        .last()
        .text()
        .trim()
        .replace(' stars today', '')

      return {
        author,
        repo: name,
        description,
        language,
        url: `https://github.com/${url}`,
        stars,
        forked,
        builtBy,
        starsToday,
      }
    })

  return target
}

const start = async () => {
  const result = {}
  for (const url of urlsByLanguage) {
    await sleep(2000)
    const target = await crawl(url.url)
    result[url.language] = target
  }

  const today = moment().format('YYYY-MM-DD')
  writeJSON(`./results/github/${today}.json`, result)

  return result
}

module.exports = start
