const express = require('express');
const config = require('./config');
const app = express();
const { port } = config;

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
