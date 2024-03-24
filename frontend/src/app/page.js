'use client'
import Form from "./components/Form.js";
import Header from "./components/Header.js";
import Chart from "./components/Report.js";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState(true);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [categories, setCategories] = useState([]);
  const [minimumTotal, setTotal] = useState("");
  const [data, setData] = useState({});
  const [tableData, setTable] = useState([]);
  
  let prop_map = {
    order_id: "Order ID", 
    customerfirstname: "Customer First Name", 
    customerlastname: "Customer Last Name", 
    product_name: "Product Name", 
    category: "Category",
    order_total: "Order Total", 
    order_date: "Order Date",
    employeefirstname: "Employee First Name",
    employeelastname: "Employee Last Name"
  }

  return form ? (
    <div className="h-screen bg-blue-400 flex items-center justify-center">
      <div className="bg-slate-200 w-[40%] h-min flex-none flex-col">
        <Header />
        <Form 
          date1 = {date1}
          date2 = {date2}
          setDate1 = {setDate1}
          setDate2 = {setDate2}
          categories = {categories}
          minimumTotal = {minimumTotal}
          setCategories = {setCategories}
          setTotal = {setTotal}
          setForm={setForm}
          setData={setData}
          setTable={setTable}
        />
      </div>
    </div>
  ) : (
    <div className="h-screen bg-blue-400 flex flex-col items-center justify-center">
      <div className="bg-slate-200 w-[40%] h-min flex-none flex-col rounded-lg">
        <Chart data={data}/>
        <button
          onClick={() => {
            setDate1("");
            setDate2("");
            setTotal("");
            setForm(true);
          }}
          className="bg-blue-300 m-2 p-2 rounded-md"
        >
          Generate Another Report?
        </button>
      </div>
      <div className="my-5 bg-slate-200 item-center rounded-md">
        <table>
          <tbody>
            <tr>
              {Object.keys(tableData.length > 0 ? tableData[0] : {}).map((e, idx) => {
                return <th className="border-2 border-slate-800 p-1"key={idx}>{prop_map[e]}</th>
              })}
            </tr>
            {tableData.map((e, idx) => {
              return (
                <tr key={idx}>
                  {Object.keys(e).map((key, val) => {
                    return(
                      <td className="border-2 border-slate-800 text-center" key={val+"s"}>{e[key]}</td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
