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
    let result = await db.query("SELECT DISTINCT category FROM products ORDER BY category ASC;");
    let data = result.rows;
    console.log(data);
    data = data.reduce((acc, ele) => {
        acc.push(ele.category);
        return acc;
    }, [])
    res.send(data);
});

app.post('/getReportInfo', async(req, res) => {
    console.log(req.body);
    let query = (req.body.minDate !== "" && req.body.maxDate != "") ?
        `SELECT category, SUM(ordertotal) as total 
        FROM orders AS o 
        INNER JOIN products as p 
        ON o.productid = p.productid 
        WHERE orderTotal >= ${req.body.minimumTotal}
        AND orderDate BETWEEN '${req.body.minDate}' AND '${req.body.maxDate}'
        GROUP BY category;` 
        :
        `SELECT category, SUM(ordertotal) as total 
        FROM orders AS o 
        INNER JOIN products as p 
        ON o.productid = p.productid 
        WHERE orderTotal >= ${req.body.minimumTotal}
        GROUP BY category;`
    let result = await db.query(query);
    let retVal = result.rows.filter(e => req.body.categories.includes(e.category));
    res.send(retVal)
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