// AnimeInfo.js
import React from 'react';
import Title from './AnimeTitle';
import AdditionalInfo from './AdditionalInfo';
import Summary from './AnimeSummary';

const AnimeInfo = ({ animeInfo }) => {
  return (
    <div>
      <Title
        title={animeInfo.title}
        subOrDub={animeInfo.subOrDub}
        image={animeInfo.image}
        id={animeInfo.id}
      />
      <AdditionalInfo
        otherName={animeInfo.otherName}
        type={animeInfo.type}
        status={animeInfo.status}
        releaseDate={animeInfo.releaseDate}
        totalEpisodes={animeInfo.totalEpisodes}
      />
      <Summary description={animeInfo.description} />
    </div>
  );
};

export default AnimeInfo;
