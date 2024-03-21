SELECT 
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
ON e.employeeid = o.employeeid;