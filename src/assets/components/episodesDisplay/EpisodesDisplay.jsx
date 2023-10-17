// EpisodesDisplay.js
import React, { useEffect, useState, useMemo } from 'react';
import EpisodeList from './EpisodeList';
import WatchorDownload from './WatchorDownload';

import { useNavigate, useParams } from 'react-router-dom';
const EpisodesDisplay = ({
 animeInfo, watchPageFlag, currentEpisodeNumber
}) => {
  
  const [episodeList, setEpisodeList] = useState([]);
  const [linkoption, setlinkoption] = useState(currentEpisodeNumber || 1);
  const [currentPage, setCurrentPage] = useState((Math.ceil(Number(currentEpisodeNumber)/20)) || 1);
  const [isLoading,setIsLoading] = useState(true);
  const [slicing,setSlicing] = useState(20);
  const [start,setStart] = useState((20*(Math.ceil(Number(currentEpisodeNumber)/20)-1)) || 0);
  const [enablenext,setEnablenext] = useState(true);
  const navigate = useNavigate();
  let { animeId } = useParams();
 const memoizedParams = useMemo(() => {
    return {
      animeInfo,
      currentPage,
      slicing,
    };
  }, [animeInfo, currentPage, slicing]);

  useEffect(() => {
    const handleEpisodeList = () => {
      const { animeInfo, currentPage,  slicing } = memoizedParams;

      if (animeInfo && animeInfo?.episodes) {
        try {
          const end = start + slicing;
          setEnablenext(end >= animeInfo?.episodes?.length ? true : false);
          const episodeSlice = animeInfo?.episodes?.slice(start, end);
          setEpisodeList(episodeSlice);
        } catch (err) {
          console.error(err);
        } 
      }
    };
    handleEpisodeList();
    
  }, [memoizedParams]);
  const handleEpisodeClick = (epnum) => {
    if(watchPageFlag){
      const qvalue = new URLSearchParams(window.location.search).get('q');
      const evalue = new URLSearchParams(window.location.search).get('e');
      navigate(`/watch/${animeId}?e=${evalue.slice(0,evalue.lastIndexOf('-')+1)+ epnum}&q=${qvalue}`);
      window.scrollTo(0, 0);
    }
    setlinkoption(epnum);
    setIsLoading(true);
  };

  const goToNextPage = () => {
    setCurrentPage(prev => prev + 1);
    setStart(prev=> prev + slicing);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max( prev - 1, 1));
    setStart(prev=> Math.max((prev - slicing),0));
  };

  const handleJumpTo = (newnum) => {
    setCurrentPage(Math.ceil(Number(newnum)/slicing));
    setStart(slicing*(Math.ceil(Number(newnum)/slicing)-1));    
    setlinkoption((newnum!=="" && newnum) ?Number(newnum): 0);
    setIsLoading(true);
  };
  const handleSlicing = (value) =>{
    if(slicing != value){
      setSlicing(value);
      setCurrentPage(Math.ceil(Number(linkoption)/value));
      setStart(value*(Math.ceil(Number(linkoption)/value)-1));      
    }
  };
  return (
    <div style={{overflow:'hidden'}}>
      <EpisodeList
        episodeList={episodeList}
        linkoption={linkoption}
        handleEpisodeClick={handleEpisodeClick}
        currentPage={currentPage}
        enablenext={enablenext}
        goToNextPage={goToNextPage}
        slicing={slicing}
        goToPreviousPage={goToPreviousPage}
        handleJumpTo={handleJumpTo}
        handleSlicing={handleSlicing}
        lastepisodenumber={animeInfo?.episodes?.length}
        watchPageFlag={watchPageFlag || false}
      />
      
      <WatchorDownload linkoption={linkoption} animeInfo={animeInfo} />
    </div>
  );
};

export default EpisodesDisplay;