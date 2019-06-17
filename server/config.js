require('dotenv').config({ path: '../.env' });

const { PORT } = process.env;

module.exports = {
    port: PORT,
};
