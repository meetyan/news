const express = require('express');
const target = require('./io/target');

const app = express();
const port = 8773;

app.get('/', target);

app.listen(port);

console.log(`The server has started on http://localhost:${port}!`);
