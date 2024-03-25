//Library imports
import { useEffect } from "react";
import axios from "axios";

//Component imports
import DatePicker from "./formComponents/datePicker.js";
import Categories from "./formComponents/categoryPicker.js";
import OrderMin from "./formComponents/orderMin.js";

//Exported component
export default function Form({ date1, date2, setDate1, setDate2, categories, setCategories, minimumTotal, setTotal, setForm, setData, setTable1, setUsers }) {
  //Runs once on mounting. Retrieves the product categories and set it to the corresponding state.
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

  //Some helper functions to get the data from the database
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

  //Initiating the server requests and processing results and setting them to state.
  const handleGetDB = () => {
    //reducing the categories from an array of objects to an array of strings.
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
    //async functions to be handled with a then and catch as they are promises.
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
  //returing the form. Mainly just sub components.
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
            //Handles the click event. Making sure the dates are in chronological order.
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
