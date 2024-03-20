const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./dbConnect.js');
const port = 8000;

const app = express();
db.connect().then(() => console.log("Connected!")).catch((err) => console.error(err));

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors({origin: "http://localhost:3000"}))

app.get('/getCategories', async(req, res) => {
    // db.query(`SELECT * FROM products`).then((data) => console.log(data.rows ? data.rows[0] : ""));
    res.send(["Hello", "World", "Testing"]);
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

process.on('SIGINT', () => {
    db.end()
    .then(() => {
        console.log("Connection ended!");
        process.exit();
    })
    .catch(err => console.error(err));
});