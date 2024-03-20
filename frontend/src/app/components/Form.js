import { useEffect } from "react";
import axios from "axios";

import DatePicker from "./FormComponents/datePicker";
import Categories from "./FormComponents/categoryPicker";
import OrderMin from "./FormComponents/orderMin";

export default function Form({ date1, date2, setDate1, setDate2, categories, setCategories, minimumTotal, setTotal, setForm }) {
  useEffect(() => {
    axios.get('http://localhost:8000/getCategories')
    .then(function (response) {
        setCategories(response.data.map(e => {
            return {name:e, checked:false};
        }));
    })
    .catch(function (error) {
        console.log(error);
    });
  }, []);
  return (
    <div>
      <DatePicker
        date1 = {date1}
        date2 = {date2}
        setDate1 = {setDate1}
        setDate2 = {setDate2}
      />
      <Categories 
        categories={categories} 
        setCategories={setCategories}
      />
      <OrderMin 
        minimumTotal={minimumTotal}
        setTotal={setTotal}
      />
      <div className="flex items-center justify-center">
        <button
          onClick={() => setForm(false)}
          className="bg-blue-300 m-2 p-2 rounded-md"
        >
          Generate
        </button>
      </div>
    </div>
  );
}
