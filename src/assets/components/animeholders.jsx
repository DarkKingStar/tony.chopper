import React, { useMemo} from "react";
import GridItem from "./gridItem";
import { LazyMotion, domAnimation, m } from "framer-motion"


const Animeholders = (props) => {
    const data = useMemo(() => props?.jsonData?.results, [props?.jsonData?.results]);
    return (
      <>
        <div className="container">
              <div className="grid-container">
                {data?.map((item, index) => (
                  <GridItem
                    key={index}
                    item={item}
                    handleShowSearchBar={props?.handleShowSearchBar} 
                    navbarSearch={props?.navbarSearch}
                  />
                ))}
              </div>
        </div>
      </>
    );
  };
  
  export default Animeholders;