import { useState } from "react";
import { FetchSearchData } from "../fetch/fetchsearchdata";
import Animeholders from "./animeholders";
import "./searchbox.css";
import { useNavigate } from 'react-router-dom';


function SearchBox({handleShowSearchBar,navbarSearch}) {
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
        <div className="container">
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
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="24px"  height="24px"><path fill="#CF2642" d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/></svg>                 
            </button>
            </div>
            </div>
        </form>
        </div>
        {sdata?.results?.length > 0 &&
        <>
        <h1>Search Result: {result}</h1>
        <Animeholders jsonData={sdata} handleShowSearchBar={handleShowSearchBar} navbarSearch={navbarSearch} />
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
