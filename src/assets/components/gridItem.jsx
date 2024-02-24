import React from "react";
import LazyImage from "../functions/LazyImage";
import { useNavigate } from "react-router-dom"; 


const GridItem = ({ item, handleShowSearchBar, navbarSearch }) => {
  const navigate = useNavigate();
  const handleNavigate = () =>{
    navigate("/info/"+item.id);
    if(navbarSearch){
      handleShowSearchBar();
    }
  }
  return (
    <div className="grid-item"  onClick={handleNavigate}>
      <div className="grid-item-overlay"/>
      <div className="poster item">
        <LazyImage src={item.image} alt="" />
      </div>
      <div className="anime-name item">
        <p className="non-hover-p">{item.title}</p>
      </div>
    </div>
  );
};

export default GridItem;
