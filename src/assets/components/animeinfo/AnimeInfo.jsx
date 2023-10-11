// AnimeInfo.js
import React from 'react';
import Title from './AnimeTitle';
import AdditionalInfo from './AdditionalInfo';
import Summary from './AnimeSummary';
import FadeInFromRight from '../../functions/FadeInFromRight';
import FadeInFromLeft from '../../functions/FadeinFromLeft';

const AnimeInfo = ({ animeInfo }) => {
  return (
    <div style={{overflow:'hidden'}}>
      <FadeInFromRight value={
        <>
          <Title
          title={animeInfo.title}
          subOrDub={animeInfo.subOrDub}
          image={animeInfo.image}
          id={animeInfo.id}
          />  
        </>
      }/>
      <FadeInFromLeft value={
        <>
          <AdditionalInfo
          otherName={animeInfo.otherName}
          type={animeInfo.type}
          status={animeInfo.status}
          releaseDate={animeInfo.releaseDate}
          totalEpisodes={animeInfo.totalEpisodes}
          />  
        </>
      }/>
      <FadeInFromRight value={
        <>
          <Summary description={animeInfo.description} /> 
        </>
      }/>
      
      
    </div>
  );
};

export default AnimeInfo;
