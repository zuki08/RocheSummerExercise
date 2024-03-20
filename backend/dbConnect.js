const { Client } = require("pg");

const cli = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: "roche",
    password: "postgres",
    port: 5432,
})

module.exports = cli;