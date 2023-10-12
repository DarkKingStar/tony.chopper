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
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchAnimeInfo(animeId);
        setAnimeInfo(data);
        setLoading(false);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [animeId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!animeInfo) {
    return <Error404Page />; // Render a 404 error page here
  }

  return (
    <div className='container'>
      <AnimeInfo animeInfo={animeInfo} />
      <EpisodesDisplay animeInfo={animeInfo} watchPageFlag={false}/>
    </div>
  );
};

const Error404Page = () => {
  return (
    <div className='error-page'>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default InfoPage;
