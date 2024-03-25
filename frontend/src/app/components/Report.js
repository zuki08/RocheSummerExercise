//component import.
import BarChart from "./Chart.js";

export default function Chart ( {data} ) {
    //Splitting the data into categories and total arrays to be rendered.
    let categories = [];
    let totals = [];
    data.forEach(e => {
        categories.push(e.category);
        totals.push(e.total);
    });

    return (
        <div>
            <BarChart categories={categories} totals={totals}/>
        </div>
    )
}