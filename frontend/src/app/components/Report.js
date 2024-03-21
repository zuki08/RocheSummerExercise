import BarChart from "./Chart";

export default function Chart ( {data} ) {
    console.log(data);
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