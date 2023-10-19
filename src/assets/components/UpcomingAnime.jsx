import React, { useEffect, useState, useRef } from 'react';
import { FetchUpcomingAnime } from '../fetch/fetchupcominganime';
import LazyImage from '../functions/LazyImage';
import "./UpcomingAnime.css";
const UpcomingAnime = ({bgImgDivRef})=> {
    const [upcomingData, setUpcomingData] = useState(null);
    const [indexcount, setIndexcount] = useState(null);
    const [pageNumber,setPageNumber] = useState(1);
    const [isFading, setIsFading] = useState(false);
     
    useEffect(() => {
      const FetchData = async () => {
        const data = await FetchUpcomingAnime(pageNumber);
        setUpcomingData(data);
        console.log(data);
      }
      FetchData();
    }, [pageNumber]);
  
    useEffect(() => {
      if (upcomingData && bgImgDivRef) {
        setIndexcount(upcomingData?.pagination?.items?.count - 1);
  
        // Create a ResizeObserver
        const resizeObserver = new ResizeObserver(() => {
          const UpcomingAnime = document.getElementById("UpcomingAnime");
  
          if (bgImgDivRef.current && UpcomingAnime) {
            UpcomingAnime.style.height = bgImgDivRef.current.offsetHeight + 'px';
            UpcomingAnime.style.width = bgImgDivRef.current.offsetWidth + 'px';
          }
        });
  
        // Observe the bgImgDivRef
        resizeObserver.observe(bgImgDivRef.current);
  
        return () => {
          // Disconnect the observer on component cleanup
          resizeObserver.disconnect();
        };
      }
    }, [upcomingData]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (indexcount > 0) {
          setIndexcount(prev => prev - 1);
        } else {
          setIndexcount(upcomingData?.pagination?.items?.count - 1)
          upcomingData?.pagination?.has_next_page ? setPageNumber(prev=>prev+1): setPageNumber(1);
        }
      }, 10000);
      return () => clearInterval(interval);
    }, [indexcount, upcomingData]);
    
    useEffect(() => {
      setIsFading(true); 
      const timeout = setTimeout(() => {
        setIsFading(false); 
      }, 1000);
      return () => clearTimeout(timeout); 
    }, [indexcount]);
    return (<>
        {upcomingData &&
        <div className={`UpcomingAnime ${isFading ?  ' ': 'fade-in'}`} id="UpcomingAnime">
        <div className='UpcomingImage' style={{backgroundImage:`url(${
        upcomingData?.data[indexcount]?.images?.webp?.image_url})`}}>
          <div style={{width:"100%",height:"100%", backdropFilter:"blur(20px)", margin:"0", 
          display:"flex"
        }}>
            <LazyImage src={upcomingData?.data[indexcount]?.images?.webp?.large_image_url} alt={""}/>
          </div>
        </div>
        <div className='UpcomingDetails'>
          <div className='UpcomingTitle'>
            <p>{upcomingData?.data[indexcount]?.title}</p>
          </div>
          <div className='UpcomingDetailsAir'>
            <p><b>Airing:</b> {upcomingData?.data[indexcount]?.aired?.string}</p>
          </div>
          <div className='UpcomingDetailsAir'>
            <p><b>Trailer:</b> <a href={upcomingData?.data[indexcount]?.trailer?.url} target='_blank' 
              style={{color:'yellow'}} title='Youtube'> Watch</a></p>
          </div>
          <div className="UpcomingDetailsAir">
            <p><b>Add To List: </b> <a 
            style={{color:'blue'}}
            href={upcomingData?.data[indexcount]?.url} target="_blank">Click Here</a></p>
            
            <h1>
              {((pageNumber-1) *24) + (24-indexcount + 1)}
            </h1>
          </div>
        </div>
      </div>}
    </>);
}

export default UpcomingAnime;