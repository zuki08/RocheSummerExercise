import { useEffect, useState} from "react";
import axios from "axios";
export default function Categories(){
    const[categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/getCategories')
        .then(function (response) {
            console.log(response);
            setCategories(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);
    console.log(categories);
    return(
        <div>
            <ul className="p-2">
                {categories.map((e, idx) => <li key={idx}>{e}</li>)}
            </ul>
        </div>
    );
}