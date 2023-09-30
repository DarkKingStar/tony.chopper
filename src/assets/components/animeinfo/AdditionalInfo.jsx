import React from 'react';

const AdditionalInfo = ({ otherName, type, status, releaseDate, totalEpisodes }) => {
  return (
    <div>
      <p>Other name: {otherName}</p>
      <p>Type: {type}</p>
      <p>Status: {status}</p>
      <p>Released: {releaseDate}</p>
      <p>Episodes: {totalEpisodes}</p>
    </div>
  );
};

export default AdditionalInfo;