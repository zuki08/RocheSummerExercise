export default function Tables({ data }) {
  let prop_map = {
    order_id: "Order ID",
    customerfirstname: "Customer First Name",
    customerlastname: "Customer Last Name",
    product_name: "Product Name",
    category: "Category",
    order_total: "Order Total",
    order_date: "Order Date",
    employeefirstname: "Employee First Name",
    employeelastname: "Employee Last Name",
    amountpurchased: "Amount Purchased",
  };
  return (
    <div className="my-5 bg-slate-200 item-center rounded-md">
      <table>
        <tbody>
          <tr>
            {Object.keys(data.length > 0 ? data[0] : {}).map((e, idx) => {
              return (
                <th className="border-2 border-slate-800 p-1" key={idx}>
                  {prop_map[e]}
                </th>
              );
            })}
          </tr>
          {data.map((e, idx) => {
            return (
              <tr key={idx}>
                {Object.keys(e).map((key, val) => {
                  return (
                    <td
                      className="border-2 border-slate-800 text-center"
                      key={val + "s"}
                    >
                      {key === "amountpurchased" ? e[key].toFixed(2) : e[key]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
