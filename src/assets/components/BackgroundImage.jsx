import React from 'react';
import './BackgroundImage.css'; // Create this CSS file for styling

const BackgroundImage = () => {
  return (
    <div className="background-image-container">
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
