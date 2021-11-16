/**
 * 知乎热榜
 */

const axios = require('axios')

const { getTodaysDate, readJSON, exists } = require('../common')
const { CATEGORY } = require('../constants')

const crawler = async () => {
  const url =
    'https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=100'
  const { data: source } = await axios.get(url)

  const target = source.data.map(item => ({
    title: item.target.title,
    description: item.target.excerpt,
    url: item.target.url,
  }))

  return target
}

const start = async () => {
  const today = getTodaysDate()
  const jsonPath = `./results/${CATEGORY.ZHIHU_BILLBOARD}/${today}.json`
  const hasJSON = exists(jsonPath)

  let result = await crawler()

  if (hasJSON) {
    const previous = readJSON(jsonPath)

    const previousTitles = previous.map(item => item.title)
    result = result.reduce((accumulator, item) => {
      if (!previousTitles.includes(item.title)) {
        accumulator.push(item)
      }
      return accumulator
    }, previous)
  }

  return result
}

module.exports = start
