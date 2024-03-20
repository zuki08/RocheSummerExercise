import { useEffect } from "react";
import axios from "axios";
export default function DatePicker({date1, date2, setDate1, setDate2}){
    return (
        <div className="m-2 flex flex-row">
        <label className="mx-1">Order Date... From:</label>
        <input
          name="date1"
          type="date"
          className="mx-2"
          value={date1}
          onChange={(e) => {
            setDate1(e.target.value);
          }}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
        <label className="mx-1">To:</label>
        <input
          name="date2"
          type="date"
          className="mx-2"
          min={date1 !== "" ? date1 : ""}
          value={date2}
          onChange={(e) => {
            setDate2(e.target.value);
          }}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
      </div>
    );
}