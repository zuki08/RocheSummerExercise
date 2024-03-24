const { Pool } = require("pg");
require('dotenv').config();
const cli = new Pool({
    user: 'postgres.zrpteuimmhssomhiwdvu',
    host: 'aws-0-us-east-1.pooler.supabase.com',
    database: "postgres",
    password: process.env.db_Pass,
    port: 5432,
});
 
module.exports = cli;


// const pg = require("postgres");
// require('dotenv').config();
// const connectionURL = process.db_url;
// const cli = pg(connectionURL);
// module.exports = cli;