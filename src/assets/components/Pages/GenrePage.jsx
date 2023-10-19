import { useEffect, useState } from "react";
import SubHeading from "./SubHeading";
import { FetchGenreList } from "../../fetch/fetchgenrelist";
import "./GenrePage.css"
const GenrePage = () =>{
    const [genreList,setGenreList] = useState(null);
    useEffect(()=>{
        const fetchData = async() =>{
            const data = await FetchGenreList();
            console.log(data);
            setGenreList(data);
              window.scrollTo(0, 0);
        }
        fetchData();
    },[])

    return(<>
    <div className="container">
        <SubHeading text={"Genre List"}/>
    </div>
    <div className="container" style={{display:"flex"}}>
        <div>
        <ul className="genrelist">
        {genreList?.list?.map((item,index)=>(
            <li className="genreitem" key={index}>{item}</li>
        ))}
        </ul>
        </div>
        <div className="container">

        </div>
    </div>
    </>)
}
export default GenrePage;