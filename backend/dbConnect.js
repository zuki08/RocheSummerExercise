const { Client } = require("pg");
require('dotenv').config();
const cli = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: "roche",
    password: "postgres",
    port: 5432,
});
 
module.exports = cli;


// const pg = require("postgres");
// require('dotenv').config();
// const connectionURL = process.db_url;
// const cli = pg(connectionURL);
// module.exports = cli;