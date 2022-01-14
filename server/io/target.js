const {CATEGORY} = require('../../src/constants');
const {readJSON} = require('../../src/common');

const validateNumber = (number) => {
	return Number.isInteger(+number) && +number >= 0;
};
const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = async (req, res) => {
	const {category, offset = 0, limit = 50, language} = req.query;

	const valid = Object.values(CATEGORY).some((value) => value === category);
	if (!valid) return res.json([]);

	if (!validateNumber(offset) || !validateNumber(limit)) {
		return res.json({error: 'Parameter offset or limit is invalid.'});
	}

	try {
		let final = readJSON(`./results/${category}/latest.json`);

		switch (category) {
			case CATEGORY.GITHUB_RANKINGS: {
				if (!language) break;

				final = readJSON(`./results/${category}/latest-by-language.json`);

				const _language = capitalizeFirstLetter(language);
				final = final[_language] || [];
				break;
			}

			case CATEGORY.GITHUB_TRENDING: {
				const _language = capitalizeFirstLetter(language);
				final = final[_language] || [];
				break;
			}

			case CATEGORY.WEIBO_HOT:
				final = Object.entries(final).map(([key, value]) => ({
					name: key,
					url: value,
				}));
				break;

			case CATEGORY.BAIDU_HOT:
			case CATEGORY.ZHIHU_BILLBOARD:
			default:
				break;
		}

		return res.json(final.slice(+offset, +offset + +limit));
	} catch (error) {
		console.log('error', error);
		return res.json({error: 'unknown error'});
	}
};
