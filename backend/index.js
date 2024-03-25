const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./dbConnect.js");
const port = 8000;

const app = express();
db.connect()
  .then(() => console.log("Connected!"))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors({ origin: process.env.REACT_URL }));

app.get("/", async (req, res) => {
  res.json({ msg: "Up and Running" });
});

app.get("/getCategories", async (req, res) => {
  let result = await db.query(
    `SELECT DISTINCT category FROM products ORDER BY category ASC;`
  );
  let data = result.rows;
  data = data.reduce((acc, ele) => {
    acc.push(ele.category);
    return acc;
  }, []);
//   data.push("test");
  res.send(data);
});

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
  let retVal =
    req.body.categories.length > 0
      ? result.rows.filter((e) => req.body.categories.includes(e.category))
      : result.rows;
  res.send(retVal);
});

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
  let data =
    body.categories.length > 0
      ? result.rows.filter(
          (ele) =>
            body.categories.includes(ele.category)
        )
      : result.rows
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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

process.on("SIGINT", () => {
  db.end()
    .then(() => {
      console.log("Connection ended!");
      process.exit();
    })
    .catch((err) => console.error(err));
});

// o.orderid AS "Order ID",
// c.firstname AS "Customer First Name",
// c.lastname AS "Customer Last Name",
// p.productname AS "Product Name",
// p.category AS "Category",
// o.orderTotal AS "Order Total",
// o.orderDate AS "Order Date",
// e.firstname AS "Employee First Name",
// e.lastname AS "Employee Last Name"
