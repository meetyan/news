const CATEGORY = {
  GITHUB_TRENDING: 'github-trending',
  WEIBO_HOT: 'weibo-hot',
  BAIDU_HOT: 'baidu-hot',
}

const CATEGORY_MAP = {
  [CATEGORY.GITHUB_TRENDING]: 'GitHub trending',
  [CATEGORY.WEIBO_HOT]: 'Weibo hot',
  [CATEGORY.BAIDU_HOT]: 'Baidu hot',
}

const UA = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
}

module.exports = {
  CATEGORY,
  CATEGORY_MAP,
  UA,
}
