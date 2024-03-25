# Setting up

- Please have Node.js installed.
- Run `npm install` to install all the dependencies that the applications will use.
- Make sure you have postgres installed. If not, you can find more info [here](https://www.postgresql.org/download/)
    - Run `psql -U <username>`
    - Use `CREATE DATABASE <name>` to create a database and exit psql
    - In the terminal: use `psql --username=<db_user_name> databasename < data_base_dump.sql` to load in the database. Make sure .sql file is in the same directory!
- Go to .env.example and fill in the parameters
    - `REACT_URL` is the link of the frontend. Can use "http://localhost:3000'
    - All other ENV_VARS are database related.
# Starting up the server

- Once everything is set up. Make sure the database is running.
- Run `node index.js` in this directory through the terminal to spin up the server!