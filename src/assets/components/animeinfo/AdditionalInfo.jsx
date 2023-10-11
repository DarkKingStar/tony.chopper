import React from 'react';

const AdditionalInfo = ({ otherName, type, status, releaseDate, totalEpisodes }) => {
  return (
    <div style={{marginTop:"80px"}}>
      <p><b>Other name:</b> {otherName}</p>
      <p><b>Type:</b> {type}</p>
      <p><b>Status:</b> {status}</p>
      <p><b>Released:</b> {releaseDate}</p>
      <p><b>Episodes:</b> {totalEpisodes}</p>
    </div>
  );
};

export default AdditionalInfo;