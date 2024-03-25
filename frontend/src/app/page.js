'use client' // https://nextjs.org/docs/app/building-your-application/rendering/client-components

//Component imports.
import Form from "./components/Form.js";
import Header from "./components/Header.js";
import Chart from "./components/Report.js";
import Tables from "./components/Tables.js";

//importing library functions.
import { useState } from "react";

// The Main function handling logic.
export default function Home() {
  // Setting in states for the main render.
  const [form, setForm] = useState(true);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [categories, setCategories] = useState([]);
  const [minimumTotal, setTotal] = useState("");
  const [data, setData] = useState({});
  const [tableData, setTable1] = useState([]);
  const [userData, setUsers] = useState([]);

  //Ternary logic render, if True show this screen.
  return form ? (
    <div className="h-screen bg-blue-400 flex items-center justify-center">
      <div className="bg-slate-200 w-[40%] h-min flex-none flex-col">
        {/* Header Component Instructions. */}
        <Header />
        {/* Form Component: The input field and state updating, the state vars and functions are passed in as props. */}
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
          setTable1={setTable1}
          setUsers={setUsers}
        />
      </div>
    </div>
  ) : (
    //If form is false -> show this screen.
    <div className="h-screen bg-blue-400 flex flex-col items-center justify-center">
      <div className="bg-slate-200 w-[40%] h-min flex-none flex-col rounded-lg">
        {/* The Chart component to render. */}
        <Chart data={data}/>
        {/* Button that handles state changing. */}
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
      {/* Tables that show the data used to visualize the chart. */}
      <Tables data={tableData} />
      <Tables data={userData} />
    </div>
  );
}
