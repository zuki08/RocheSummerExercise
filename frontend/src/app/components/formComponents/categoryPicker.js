//module function export. JSX
export default function Categories({categories, setCategories}){
    //updating the checked categories for easy compiling into the array for POST request.
    const handleCheck = (n) => {
        let newList = categories.map(e => {
            if(e.name === n){
                e.checked = !e.checked;
            }
            return e;
        })
        //updateing status
        setCategories(newList);
    }
    return(
        <div className="mx-3">
            {/* Displaying the list with checkboxes */}
            <p>Filter categories: </p>
            <ul className="flex flex-row flex-wrap">
                {/* Mapping through the list */}
                {categories.map((e, idx) => {
                    return(
                        <li className="mx-2" key={idx}>
                            <input type="checkbox" className="mx-1"
                                checked = {e.checked}
                                onChange={() => handleCheck(e.name)}
                            />
                            {e.name}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}