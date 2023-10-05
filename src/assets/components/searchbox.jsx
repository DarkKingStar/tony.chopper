import { useState } from "react";
import { FetchSearchData } from "../fetch/fetchsearchdata";
import Animeholders from "./animeholders";
import "./searchbox.css";
import { useNavigate } from 'react-router-dom';


function SearchBox() {
    const [sdata, setSdata] = useState([]);
    const [query, setQuery] = useState("");
    const [result,setResult] = useState("");
    const navigate = useNavigate();


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
        <div className="container mt-2">
        <form onSubmit={handleSubmit}>

        <div className="searchbar">
          <div className="searchBar">
            <input id="searchQueryInput" 
            type="text" 
            name="searchQueryInput" 
            placeholder='Type Here To Search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}/>
            <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
              <img alt="Go" src="./search.svg"/>                    
            </button>
            </div>
            </div>
        </form>
        </div>
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
