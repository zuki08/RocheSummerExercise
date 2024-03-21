import Chart from "./Chart";

export default function Report ( {data} ) {
    console.log(data);
    let categories = [];
    let totals = [];
    data.forEach(e => {
        categories.push(e.category);
        totals.push(e.total);
    });

    return (
        <div>
            <Chart categories={categories} totals={totals}/>
        </div>
    )
}