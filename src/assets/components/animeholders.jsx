import React, { useMemo, useState, useEffect } from "react";
import { FetchAnimeInfo } from "../fetch/fetchanimeinfo";
import GridItem from "./gridItem";
import { LazyMotion, domAnimation, m } from "framer-motion"


const Animeholders = (props) => {
    const data = useMemo(() => props.jsonData.results, [props.jsonData.results]);
    const [animeinfo, setAnimeinfo] = useState({});
    const [loading, setLoading] = useState(true);
  
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
          <LazyMotion features={domAnimation}>
            <m.div 
            initial={{opacity : 0}}
            animate={{ opacity: 1 }} >
              <div className="grid-container">
                {data?.map((item, index) => (
                  <GridItem
                    key={index}
                    item={item}
                    animeinfo={animeinfo}
                    loading={loading}
                  />
                ))}
              </div>
            </m.div>
          </LazyMotion>
        </div>
      </>
    );
  };
  
  export default Animeholders;