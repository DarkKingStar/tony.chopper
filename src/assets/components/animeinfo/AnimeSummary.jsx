import React from 'react';

const Summary = ({ description }) => {
  return (
    <div className='container'>
      <h2>Summary</h2>
      <div className="container">
      <p>{description}</p>
      </div>
    </div>
  );
};

export default Summary;