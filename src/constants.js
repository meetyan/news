const CATEGORY = {
  GITHUB_TRENDING: 'github-trending',
  WEIBO_HOT: 'weibo-hot',
  BAIDU_HOT: 'baidu-hot',
  ZHIHU_BILLBOARD: 'zhihu-billboard',
  GITHUB_RANKINGS: 'github-rankings',
}

const CATEGORY_MAP = {
  [CATEGORY.GITHUB_TRENDING]: 'GitHub trending',
  [CATEGORY.WEIBO_HOT]: 'Weibo hot',
  [CATEGORY.BAIDU_HOT]: 'Baidu hot',
  [CATEGORY.ZHIHU_BILLBOARD]: 'Zhihu billboard',
  [CATEGORY.GITHUB_RANKINGS]: 'Github rankings',
}

const UA = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
}

const LANGUAGES = [
  'JavaScript',
  'Rust',
  'Python',
  'C++',
  'Java',
  'Shell',
  'Dart',
  'TypeScript',
  'C',
  'Go',
  'CSS',
  'Vue',
  'PHP',
  'C#',
  'Clojure',
  'Dockerfile',
  'Ruby',
  'Vim script',
  'Jupyter Notebook',
  'Kotlin',
  'Swift',
  'Julia',
  'Markdown',
  'SCSS',
  'Objective-C',
  'HTML',
  'Scala',
  'Lua',
  'Makefile',
  'Haskell',
  'Less',
  'V',
  'TeX',
  'Batchfile',
  'Emacs Lisp',
  'Standard ML',
  'Objective-C++',
  'Elixir',
  'CoffeeScript',
  'Crystal',
  'Rascal',
]

module.exports = {
  CATEGORY,
  CATEGORY_MAP,
  UA,
  LANGUAGES,
}
