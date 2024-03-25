/*
 * The Library imports for the server using Express.
 */
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./dbConnect.js");
const port = 8000;

/*
 * Basic setting up with the respect to the server.
 */
const app = express();

/*
 * Connecting to the database.
 */
db.connect()
  .then(() => console.log("Connected!"))
  .catch((err) => console.error(err));


/*
 * Middleware that the app uses to preprocess requests.
 */
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors({ origin: process.env.REACT_URL }));

/*
 * A normal request to make sure everything is up and running. 
 */
app.get("/", async (req, res) => {
  res.json({ msg: "Up and Running" });
});

/*
 * The request to get all the unique categories for the form's category filter. 
 */
app.get("/getCategories", async (req, res) => {
  let result = await db.query(
    `SELECT DISTINCT category FROM products ORDER BY category ASC;`
  );
  let data = result.rows;
  data = data.reduce((acc, ele) => {
    acc.push(ele.category);
    return acc;
  }, []);

  res.send(data);
});

/*
 * Getting information in a specific format that the Chart component will use to render the chart. 
 */
app.post("/getChartInfo", async (req, res) => {
  let query =
    req.body.minDate !== "" && req.body.maxDate != ""
      ? `SELECT category, SUM(ordertotal) as total 
        FROM orders AS o 
        INNER JOIN products as p 
        ON o.productid = p.productid 
        WHERE orderTotal >= ${req.body.minimumTotal}
        AND orderDate BETWEEN '${req.body.minDate}' AND '${req.body.maxDate}'
        GROUP BY category;`
      : `SELECT category, SUM(ordertotal) as total 
        FROM orders AS o 
        INNER JOIN products as p 
        ON o.productid = p.productid 
        WHERE orderTotal >= ${req.body.minimumTotal}
        GROUP BY category;`;
  let result = await db.query(query);
  //Quick filtering for returning only the info for the selected categories.
  let retVal =
    req.body.categories.length > 0
      ? result.rows.filter((e) => req.body.categories.includes(e.category))
      : result.rows;
  //Sending the response.
  res.send(retVal);
});

/*
 * Getting the data in the form that the table component will parse and render. 
 */
app.post("/getTableData", async (req, res) => {
  let body = req.body;
  let query = `SELECT 
    o.orderid AS order_id, 
    c.firstname AS customerFirstName, 
    c.lastname AS customerLastName, 
    p.productname AS product_name, 
    p.category AS category,
    o.orderTotal AS order_total, 
    o.orderDate AS order_date,
    e.firstname AS employeeFirstName,
    e.lastname AS employeeLastName
    FROM orders AS o
    INNER JOIN customers AS c
    ON o.customerid = c.customerid
    INNER JOIN products AS p
    ON o.productid = p.productid
    INNER JOIN employees AS e
    ON e.employeeid = o.employeeid
    ${
      body.minDate !== "" && body.maxDate !== ""
        ? `WHERE orderDate BETWEEN '${req.body.minDate}' AND '${req.body.maxDate}';`
        : ";"
    }`;

  let result = await db.query(query);
  let rows =
    body.categories.length > 0
      ? result.rows.filter(
          (ele) =>
            body.categories.includes(ele.category) &&
            ele.order_total >= body.minimumTotal
        )
      : result.rows.filter((e) => e.order_total >= body.minimumTotal);
  res.send(rows);
});

/*
 * Getting the information with respect to the customer. 
 */
app.post("/getCustomerInfo", async (req, res) => {
  let body = req.body;
  let query = `SELECT 
    c.customerid AS cid,
    c.firstname AS customerFirstName, 
    c.lastname AS customerLastName, 
    p.category AS category,
    SUM(o.orderTotal) AS category_total 
    FROM orders AS o
    INNER JOIN customers AS c
    ON o.customerid = c.customerid
    INNER JOIN products AS p
    ON o.productid = p.productid
    INNER JOIN employees AS e
    ON e.employeeid = o.employeeid
    WHERE o.orderTotal > ${body.minimumTotal}
    ${
      body.minDate !== "" && body.maxDate !== ""
        ? `AND orderDate BETWEEN '${body.minDate}' AND '${body.maxDate}'`
        : ""
    }
    GROUP BY (cid, category);`;
  let result = await db.query(query);
  //Filtering by category first.
  let data =
    body.categories.length > 0
      ? result.rows.filter(
          (ele) =>
            body.categories.includes(ele.category)
        )
      : result.rows

  //Formatting for easier parsing on the client.
  let toSend = data.reduce((acc, elem) => {
    let val = acc.filter((e) => e.cid == elem.cid);
    if (val.length > 0) {
      val[0].amountpurchased += elem.category_total;
    } else {
      acc.push({
        cid: elem.cid,
        customerfirstname: elem.customerfirstname,
        customerlastname: elem.customerlastname,
        amountpurchased: elem.category_total,
      });
    }
    return acc;
  }, []);
  res.send(toSend);
});

//port listening.
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

//If CTRL+C, end the db connection before exiting.
process.on("SIGINT", () => {
  db.end()
    .then(() => {
      console.log("Connection ended!");
      process.exit();
    })
    .catch((err) => console.error(err));
});