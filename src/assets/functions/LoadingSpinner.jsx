import React from 'react';
import './LoadingSpinner.css'; // You can style the loading spinner here

const LoadingSpinner = () => {
  return (
    <div className="loading">
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
    </div>
  );
}

export default LoadingSpinner;
