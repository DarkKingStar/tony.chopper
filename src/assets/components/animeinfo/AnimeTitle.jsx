import React from 'react';
import LazyImage from '../../functions/LazyImage';

const Title = ({ title, subOrDub, image, id }) => {
  return (
    <div className="title-div">
      <h1>{title}</h1>
      <h3>{subOrDub.toUpperCase()}</h3>
      <div className="page-image">
        <LazyImage src={image} alt={id} />
      </div>
    </div>
  );
};

export default Title;