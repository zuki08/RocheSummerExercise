//postgres driver import
const { Client } = require("pg");

//setting up the environment variables;
require('dotenv').config();

//Creating the client for export to index.js
const cli = new Client({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: 5432,
});

//exporting the module
module.exports = cli;


// const pg = require("postgres");
// require('dotenv').config();
// const connectionURL = process.db_url;
// const cli = pg(connectionURL);
// module.exports = cli;