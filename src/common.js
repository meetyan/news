const fs = require('fs')
const path = require('path')

const loadLocal = filePath => {
  const _path = path.join(__dirname, filePath)
  return fs.readFileSync(_path)
}

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 防止过快，导致网站挂掉
 */
const sleep = async (sec = 2000) => {
  return await timeout(sec)
}

module.exports = {
  loadLocal,
  sleep,
}
