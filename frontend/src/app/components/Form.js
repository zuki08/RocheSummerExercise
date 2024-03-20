import { useState } from "react";
import DatePicker from "./formComponents/datePicker";
import Categories from "./formComponents/categoryPicker";

export default function Form({ setForm }) {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [categories, setCategories] = useState("");
  const [minimumTotal, setTotal] = useState(0);

  return (
    <form>
      <DatePicker
        date1 = {date1}
        date2 = {date2}
        setDate1 = {setDate1}
        setDate2 = {setDate2}
      />
      <Categories />
    </form>
  );
}
