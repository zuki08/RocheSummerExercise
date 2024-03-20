export default function DatePicker({date1, date2, setDate1, setDate2}){
  let res = new Date()
  let tDate = `${res.getFullYear()}-${(""+(res.getMonth()+1)).padStart(2, 0)}-${res.getDate()}`;
    return (
        <div className="mx-3 my-5 flex flex-row">
        <label>Order Date -  From:</label>
        <input
          name="date1"
          type="date"
          className="mx-2 rounded-md"
          value={date1}
          max={tDate}
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
          className="mx-2 rounded-md"
          min={date1 !== "" ? date1 : ""}
          max={tDate}
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