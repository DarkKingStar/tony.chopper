import { useState } from "react";
import { FetchSearchData } from "../fetch/fetchsearchdata";
import Animeholders from "./animeholders";

function SearchBox() {
    const [sdata, setSdata] = useState([]);
    const [query, setQuery] = useState("");
    const [result,setResult] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const jsonData = await FetchSearchData(query);
            setSdata(jsonData);
            setResult(query);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input
                className='search-input'
                id="search-input"
                type='search'
                placeholder='Type Here To search'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className='search-btn'>
                <img alt="Go" src="./search.svg" className='img-icon' />
            </button>
        </form>
        {sdata?.results?.length > 0 &&
        <>
        <h1>Search Result: {result}</h1>
        <Animeholders jsonData={sdata} />
        </>
        }
        {sdata?.results?.length <= 0 && query &&
        <>
        <h1>No Result found : {result}</h1>
        </>
        }
    </>
    );
}

export default SearchBox;
