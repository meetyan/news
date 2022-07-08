/**
 * GitHub 仓库 star 排行
 */

const axios = require('axios');

const {writeJSON, readJSON, sleep} = require('../common');
const {LANGUAGES} = require('../constants');
const SLEEP_TIMEOUT = 30 * 1000;

const crawler = async ({page = 1, language = '', stars = 2000} = {}) => {
	language = encodeURIComponent(language);
	const q = language
		? `language:${language}+created:>=2008-01-01T00:00:00Z+stars:>${stars}`
		: `stars:>${stars}`;

	try {
		const {data} = await axios({
			method: 'get',
			url: `https://api.github.com/search/repositories?q=${q}`,
			params: {
				per_page: 100,
				page,
				...(!language && {sort: 'stars'}),
			},
		});

		const target = data.items.map((item) => ({
			name: item.name,
			owner: item.owner.login,
			description: item.description,
			language: item.language,
			url: item.svn_url,
			private: item.private,
			forks: item.forks,
			open_issues: item.open_issues,
			watchers: item.watchers,
			stars: item.stargazers_count,
		}));

		return target;
	} catch (error) {
		console.log('error', error.response);
	}
};

const start = async () => {
	const byStars = [];
	for (let i = 1; i <= 10; i++) {
		console.log('by stars page - ', i);
		const data = await crawler({page: i});
		byStars.push(...data);
		await sleep(SLEEP_TIMEOUT);
	}

	const tempJSONPath = './temp.json';

	writeJSON(tempJSONPath, {});

	for (const language of LANGUAGES) {
		const temp = readJSON(tempJSONPath);

		for (let i = 1; i <= 10; i++) {
			console.log(`by language ${language} page`, i);
			await sleep(SLEEP_TIMEOUT);
			if (!temp[language]) temp[language] = [];
			const data = await crawler({page: i, language});

			if (!data.length) break;
			temp[language].push(...data);
		}

		writeJSON(tempJSONPath, temp);
	}

	const byLanguage = readJSON(tempJSONPath);

	return {byStars, byLanguage};
};

module.exports = start;
