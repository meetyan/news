/**
 * GitHub Trending
 */

const axios = require('axios');
const cheerio = require('cheerio');

const urlByLanguage = {
	default: 'https://github.com/trending',
	javascript: 'https://github.com/trending/javascript?since=daily',
	python: 'https://github.com/trending/python?since=daily',
	typescript: 'https://github.com/trending/typescript?since=daily',
	go: 'https://github.com/trending/go?since=daily',
	java: 'https://github.com/trending/java?since=daily',
};

const {sleep} = require('../common');

const crawl = async (url) => {
	const {data: source} = await axios.get(url);
	const $ = cheerio.load(source);

	const target = $('.Box-row')
		.get()
		.map((repo) => {
			const url = $(repo).find('.h3 a').first().attr('href').substr(1);
			const [author, name] = url.split('/');
			const description = $(repo).find('p').text().trim();
			const language = $(repo).find('.f6 .d-inline-block span').text();

			const [stars, forked] = $(repo)
				.find('.f6 a')
				.get()
				.map((item) => $(item).text().trim());

			const builtBy = $(repo)
				.find('.f6 .d-inline-block a img')
				.get()
				.map((item) => ({
					name: $(item).attr('alt'),
					avatar: $(item).attr('src'),
				}));

			const starsToday = $(repo)
				.find('.f6 .d-inline-block')
				.last()
				.text()
				.trim()
				.replace(' stars today', '');

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
			};
		});

	return target;
};

const start = async () => {
	const result = {};
	for (const [language, url] of Object.entries(urlByLanguage)) {
		console.log('begin language', language)
		await sleep(2000);
		const target = await crawl(url);
		result[language] = target;
		console.log('done language', language)
	}

	return result;
};

module.exports = start;
