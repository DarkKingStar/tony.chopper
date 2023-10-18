import React, { useEffect, useState } from 'react';
import './BackgroundImage.css';
import { FetchUpcomingAnime } from '../fetch/fetchupcominganime';

const BackgroundImage = () => {
  const [upcomingData,setUpcomingData] = useState(null);
  const [indexcount,setIndexcount] = useState(null);
  const [isPageFinished, SetisPageFinished] = useState(false);
  useEffect(()=>{
    const FetchData = async() =>{
      const data = await FetchUpcomingAnime();
      console.log(data);
      setUpcomingData(data);
    }
    FetchData();
  },[])
  useEffect(()=>{
    setIndexcount(0);
  },[upcomingData]);

  useEffect(()=>{
    setTimeout(() => {
      if(upcomingData?.pagination?.items?.count == indexcount){
        setIndexcount(0);
      }else{
        setIndexcount(prev=>prev+1);
      }
    }, 10000);
  },[indexcount])
  return (
    <div className="background-image-container">
      {/* <div className='Upcoming anime'>
        {indexcount}
      </div> */}
      <div className="bg-image-div">
      <img
        className="background-image"
        src="./cover.webp"
        alt="Background"
      />
      </div>
    </div>
  );
}

export default BackgroundImage;
