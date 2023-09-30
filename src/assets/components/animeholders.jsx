import React, { useMemo, useState, useEffect } from "react";
import LazyImage from "../functions/LazyImage";
import { TruncateText } from "../functions/TruncateText";
import { FetchAnimeInfo } from "../fetch/fetchanimeinfo";
import LoadingSpinner from "../functions/LoadingSpinner";
import { useNavigate } from "react-router-dom"; 

const Animeholders = (props) => {
    const data = useMemo(() => props.jsonData.results, [props.jsonData.results]);
    const [animeinfo, setAnimeinfo] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchAnimeInfoForAllItems = async () => {
        const animeInfoArray = await Promise.all(
          data.map(async (item) => {
            const jsonData = await FetchAnimeInfo(item.id);
            return { id: item.id, data: jsonData };
          })
        );
        const animeInfoObject = animeInfoArray.reduce(
          (obj, { id, data }) => ({ ...obj, [id]: data }),
          {}
        );
        setAnimeinfo(animeInfoObject);
        setLoading(false);
      };
  
      fetchAnimeInfoForAllItems();
    }, [data]);

  return (
    <>
      <div className="container">
        <div className="grid-container">
          {data?.map((item, index) => (
              <div key={item} className="grid-item">
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
                      <LoadingSpinner/>
                    ) : (
                      animeinfo[item.id] && (
                        <div className="hover-description">
                          
                          <b>Genres:</b>{" "}{animeinfo[item.id].genres?.join(", ")}
                          <br />
                          <b>Status:</b>{" "}{animeinfo[item.id].status}
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
                    {animeinfo[item.id]?<div className="visitbtn-div">
                    <button title="Click to View" onClick={() => navigate(`/info/${item.id}`)}>Watch</button>
                    </div>:<>Not Available</>}
                  </div>
                </div>
              </div>
              </div>
              
          ))}
        </div>
      </div>
    </>
  );
};
export default Animeholders;