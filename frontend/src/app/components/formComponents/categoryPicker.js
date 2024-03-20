export default function Categories({categories, setCategories}){
    const handleCheck = (n) => {
        let newList = categories.map(e => {
            if(e.name === n){
                e.checked = !e.checked;
            }
            return e;
        })
        setCategories(newList);
    }
    return(
        <div className="mx-3">
            <p>Filter categories: </p>
            <ul className="flex flex-row flex-wrap">
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