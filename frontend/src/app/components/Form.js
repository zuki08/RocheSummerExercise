import { useEffect } from "react";
import axios from "axios";

import DatePicker from "./formComponents/datePicker.js";
import Categories from "./formComponents/categoryPicker.js";
import OrderMin from "./formComponents/orderMin.js";

export default function Form({ date1, date2, setDate1, setDate2, categories, setCategories, minimumTotal, setTotal, setForm, setData, setTable1, setUsers }) {
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

  const getFromDB = async (body) => {
    let res = await axios.post("http://localhost:8000/getChartInfo", body);
    console.log(res);
    return res.data;
  }
  const getTable = async (body) => {
    let res = await axios.post("http://localhost:8000/getTableData", body);
    console.log(res);
    res.data.sort((a,b) => new Date(a.order_date) - new Date(b.order_date))
    return res.data;
  }
  const getUsers = async(body) => {
    let res = await axios.post("http://localhost:8000/getCustomerInfo", body);
    console.log(res);
    return res.data;
  }
  const handleGetDB = () => {
    let catArr = categories.reduce((acc, elem) => {
      if(elem.checked){
        acc.push(elem.name);
      }
      return acc;
    }, []);
    let body =  {
      "minDate": date1,
      "maxDate": date2,
      "categories": catArr,
      "minimumTotal": minimumTotal === "" ? 0 : minimumTotal
    };
    getFromDB(body).then(d => {
      getTable(body).then(t => {
        getUsers(body).then(u => {
          setData(d);
          t = t.map(e => {
            e.order_date = new Date(e.order_date).toDateString();
            return e;
          })
          setTable1(t);
          u = u.map(e => {
            return {
              customerfirstname: e.customerfirstname, 
              customerlastname: e.customerlastname, 
              amountpurchased: e.amountpurchased
            }
          });
          setUsers(u);
          setForm(false);
        })
      });
    })
    .catch(err => console.error(err));
  }
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
          onClick={() => {
            if(date1 > date2){
              alert("Make sure from date is before to date.");
              setDate1("");
              setDate2("");
              return;
            }
            handleGetDB();
          }}
          className="bg-blue-300 m-2 p-2 rounded-md"
        >
          Generate
        </button>
      </div>
    </div>
  );
}
