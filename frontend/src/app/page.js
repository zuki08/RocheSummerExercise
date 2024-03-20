'use client'
import Form from "./components/Form";
import Header from "./components/Header";
import { useState } from "react";

export default function Home() {
  const[form, setForm] = useState(true);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [categories, setCategories] = useState([]);
  const [minimumTotal, setTotal] = useState("");

  const getFromDB = async () => {
    console.log("Backend ops here");
    return 0;
  }

  if(!form){
    getFromDB()
    .then(d => console.log(d))
    .catch(err => console.error(err));
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
        />
      </div>
    </div>
  ) : (
    <div className="h-screen bg-blue-400 flex items-center justify-center">
      <div className="bg-slate-200 w-[40%] h-min flex-none flex-col">
        WIP
      </div>
    </div>
  );
}
