import React, { useRef } from "react";
import LazyImage from "../functions/LazyImage";
import { TruncateText } from "../functions/TruncateText";
import LoadingSpinner from "../functions/LoadingSpinner";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";

const GridItem = ({ item, animeinfo, loading, handleShowSearchBar, navbarSearch }) => {
  const navigate = useNavigate();
  const handleNavigate = () =>{
    navigate("/info/"+item.id);
    if(navbarSearch){
      handleShowSearchBar();
    }
  }
  return (
    <div className="grid-item">
        <motion.div
        initial={{ opacity:0, scale:0}}
        whileInView={{ opacity:1, scale:1}}
        viewport={{ once: false }}
        transition={{ease:"circInOut", duration: 0.05, delay: 0.1}}
      >
      <div className="poster item">
        <LazyImage src={item.image} alt={item.id} />
      </div>
      <div className="anime-name item">
        <p className="non-hover-p">{TruncateText(item.title, 21)}</p>
      </div>
      </motion.div>
      <div className="hover">
        <div className="row">
          <div className="col">
            <div className="img-hover">
              <LazyImage src={item.image} alt={item.id} />
            </div>
          </div>
          <div className="col">
            <div className="hover-title">
              <h4>{item.title}</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {loading ? (
              <LoadingSpinner/>
            ) : (
              animeinfo[item.id] && (
                <div className="hover-description">
                  <b>Genres:</b>{" "}{animeinfo[item.id].genres?.join(", ")}
                  <br />
                  <b>Status:</b>{" "}{animeinfo[item.id].releaseDate} {animeinfo[item.id].status}
                  <br />
                  <b>Episodes:</b>{" "}{animeinfo[item.id].episodes?.length}
                  <br />
                  <b>Type:</b>{" "}{animeinfo[item.id].type}
                  <br />
                  <div title={animeinfo[item.id].otherName}><b>Name:</b>{" "}{TruncateText(animeinfo[item.id].otherName, 60)}</div>
                  <div title={animeinfo[item.id].description}><b>Description:</b>{" "}{TruncateText(animeinfo[item.id].description, 100)}</div>
                </div>
              )
            )}
            {animeinfo[item.id] ? (
              <div className="visitbtn-div">
                <button title="Click to View" onClick={handleNavigate}>Watch</button>
              </div>
            ) : (
              <>Not Available</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridItem;
