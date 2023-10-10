import React, { useRef, useEffect, useState } from "react";
import LazyImage from "../../functions/LazyImage";
import { TruncateText } from "../../functions/TruncateText";
import LoadingSpinner from "../../functions/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const GridItem = ({ item, animeinfo, loading }) => {
    const gridItemRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                } else {
                    setIsInView(false);
                }
            });
        });

        observer.observe(gridItemRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);
    const navigate = useNavigate();
  
    return (
      <div
        className={`grid-item ${isInView ? 'animate' : ''}`}
        ref={gridItemRef}
      >
    <div className="poster item">
      <LazyImage src={item.image} alt={item.id} />
    </div>
    <div className="anime-name item">
      <p className="non-hover-p">{TruncateText(item.title, 21)}</p>
    </div>
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
              <LoadingSpinner />
            ) : (
              animeinfo[item.id] && (
                <div className="hover-description">
                  <b>Genres:</b> {animeinfo[item.id].genres?.join(", ")}
                  <br />
                  <b>Status:</b> {animeinfo[item.id].status}
                  <br />
                  <b>Episodes:</b> {animeinfo[item.id].episodes?.length}
                  <br />
                  <b>Type:</b> {animeinfo[item.id].type}
                  <br />
                  <div title={animeinfo[item.id].otherName}>
                    <b>Name:</b>{" "}
                    {TruncateText(animeinfo[item.id].otherName, 60)}
                  </div>
                  <div title={animeinfo[item.id].description}>
                    <b>Description:</b>{" "}
                    {TruncateText(animeinfo[item.id].description, 100)}
                  </div>
                </div>
              )
            )}
            {animeinfo[item.id] ? (
              <div className="visitbtn-div">
                <button
                  title="Click to View"
                  onClick={() => navigate(`/info/${item.id}`)}
                >
                  Watch
                </button>
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
