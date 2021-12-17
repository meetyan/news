const cron = require('node-cron');

const githubCrawler = require('./targets/github-trending');
const weiboHotCrawler = require('./targets/weibo-hot');
const baiduHotCrawler = require('./targets/baidu-hot');
const zhihuBillboardCrawler = require('./targets/zhihu-billboard');
const githubRankingsCrawler = require('./targets/github-rankings');

const git = require('./git');
const {CATEGORY} = require('./constants');
const {writeJSON} = require('./common');

// GitHub trending
cron.schedule('1 * * * *', async () => {
	console.log('Start GitHub trending');

	const result = await githubCrawler();
	await git.push({category: CATEGORY.GITHUB_TRENDING, result});

	console.log('Done GitHub trending');
});

// Weibo hot
cron.schedule('5 * * * *', async () => {
	console.log('Start Weibo hot');

	const result = await weiboHotCrawler();
	await git.push({category: CATEGORY.WEIBO_HOT, result});

	console.log('Done Weibo hot');
});

// Baidu hot
cron.schedule('10 * * * *', async () => {
	console.log('Start Baidu hot');

	const result = await baiduHotCrawler();
	await git.push({category: CATEGORY.BAIDU_HOT, result});

	console.log('Done Baidu hot');
});

// Zhihu billboard
cron.schedule('15 * * * *', async () => {
	console.log('Start Zhihu billboard');

	const result = await zhihuBillboardCrawler();
	await git.push({category: CATEGORY.ZHIHU_BILLBOARD, result});

	console.log('Done Zhihu billboard');
});

// GitHub rankings
cron.schedule('0 5 * * *', async () => {
	console.log('Start GitHub rankings');

	const {byStars, byLanguage} = await githubRankingsCrawler();

	await git.push({category: CATEGORY.GITHUB_RANKINGS, result: byStars});
	await git.push({
		category: CATEGORY.GITHUB_RANKINGS,
		result: byLanguage,
		suffix: 'by-language',
	});

	writeJSON('./temp.json', {});

	console.log('Done GitHub rankings');
});
