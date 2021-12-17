const fs = require('fs');
const path = require('path');
const moment = require('moment');

const loadLocal = (filePath) => {
	const _path = path.join(__dirname, filePath);
	return fs.readFileSync(_path);
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

const sleep = async (sec = 2000) => {
	return await timeout(sec);
};

const writeJSON = (filePath, result) => {
	const destPath = path.join(__dirname, filePath);
	fs.writeFileSync(destPath, JSON.stringify(result, null, 2));
};

const readJSON = (filePath) => {
	const destPath = path.join(__dirname, filePath);
	return JSON.parse(fs.readFileSync(destPath, 'utf-8'));
};

const exists = (filePath) => {
	const destPath = path.join(__dirname, filePath);
	return fs.existsSync(destPath);
};

const getTodaysDate = () => {
	return moment().format('YYYY-MM-DD');
};

module.exports = {
	loadLocal,
	sleep,
	writeJSON,
	readJSON,
	getTodaysDate,
	exists,
};
