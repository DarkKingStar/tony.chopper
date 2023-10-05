import React, { useState, useEffect } from 'react';
import "./InfoPage.css";
import { useParams } from 'react-router-dom';
import { FetchAnimeInfo } from '../../fetch/fetchanimeinfo';
import LoadingSpinner from '../../functions/LoadingSpinner';
import AnimeInfo from '../animeinfo/AnimeInfo';
import EpisodesDisplay from '../episodesDisplay/EpisodesDisplay';


const InfoPage = () => {
  const { animeId } = useParams();
  const [animeInfo, setAnimeInfo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchAnimeInfo(animeId);
        setAnimeInfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [animeId]);
  if (!animeInfo) {
    return <LoadingSpinner />;
  }

  return (
    <div className='container'>
      <AnimeInfo animeInfo={animeInfo} />
      <EpisodesDisplay animeInfo={animeInfo} watchPageFlag={false}/>
    </div>
  );
};
export default InfoPage;
