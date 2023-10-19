import React, {useRef } from 'react';
import './BackgroundImage.css';
import UpcomingAnime from './UpcomingAnime';

const BackgroundImage = () => {
  const bgImgDivRef = useRef(null);

  return (
    <div className="background-image-container">
      <UpcomingAnime bgImgDivRef={bgImgDivRef}/>
      <div className="bg-image-div">
        <img
          ref={bgImgDivRef}
          className="background-image"
          src="./cover.webp"
          alt="Background"
        />
      </div>
    </div>
  );
}

export default BackgroundImage;
