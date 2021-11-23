/**
 * 微博热搜
 */

const cheerio = require('cheerio')
const axios = require('axios')

const { getTodaysDate, readJSON, exists } = require('../common')
const { CATEGORY } = require('../constants')

const crawler = async () => {
  const url = 'https://s.weibo.com/top/summary'
  const { data: source } = await axios.get(url, {
    headers: {
      Cookie:
        'SUB=_2AkMWJrkXf8NxqwJRmP8SxWjnaY12zwnEieKgekjMJRMxHRl-yj9jqmtbtRB6PaaX-IGp-AjmO6k5cS-OH2X9CayaTzVD',
    },
  })

  const $ = cheerio.load(source)

  const target = $('.list_a li')
    .get()
    .reduce((accumulator, item) => {
      const url = $(item).find('a').attr('href')
      const name = $(item)
        .find('a span')
        .children()
        .remove()
        .end()
        .text()
        .trim()
      accumulator[name] = 'https://s.weibo.com' + url
      return accumulator
    }, {})

  return target
}

const start = async () => {
  const today = getTodaysDate()
  const jsonPath = `./results/${CATEGORY.WEIBO_HOT}/${today}.json`
  const hasJSON = exists(jsonPath)

  let result = await crawler()

  if (hasJSON) {
    const previous = readJSON(jsonPath)
    for (const [name, url] of Object.entries(result)) {
      if (!previous[name]) {
        previous[name] = url
      }
    }

    result = previous
  }

  return result
}

module.exports = start
