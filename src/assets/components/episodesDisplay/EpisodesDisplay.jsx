// EpisodesDisplay.js
import React, { useEffect, useState } from 'react';
import EpisodeList from './EpisodeList';
import WatchorDownload from './WatchorDownload';
import { FetchVideoLink } from '../../fetch/fetchvideolink';
const EpisodesDisplay = ({
 animeInfo
}) => {
  const [episodeLinks, setEpisodeLinks] = useState([]);
  const [episodeList, setEpisodeList] = useState([]);
  const [linkoption, setlinkoption] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [slicing,setSlicing] = useState(20);
  const [start,setStart] = useState(0);
  const [enablenext,setEnablenext] = useState(true);
  useEffect(() => {
    const fetchLinks = async () => {
      if (animeInfo && animeInfo?.episodes) {
        try {
          const end = start + slicing;
          setEnablenext(end>=animeInfo?.episodes?.length?true:false);
          const episodeSlice = animeInfo?.episodes?.slice(start, end);
          const currentEp = animeInfo?.episodes[linkoption-1] || animeInfo?.episodes[0];
          setEpisodeList(episodeSlice);
          const links = await FetchVideoLink(currentEp.id);
          setEpisodeLinks({...currentEp, ...links});
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchLinks();
  }, [animeInfo, currentPage, linkoption, slicing]);

  const handleEpisodeClick = (epnum) => {
    setlinkoption(epnum);
    setIsLoading(true);
  };

  const goToNextPage = () => {
    setCurrentPage(prev => prev + 1);
    setStart(prev=> prev + slicing);
    setlinkoption(prev =>  prev + slicing);
    setIsLoading(true);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max( prev - 1, 1));
    setStart(prev=> Math.max((prev - slicing),0));
    setlinkoption(prev =>  Math.max(prev - slicing,1));
    setIsLoading(true);
  };

  const handleJumpTo = (newnum) => {
    const pagenum = Math.ceil(Number(newnum)/slicing);
    setCurrentPage(Math.max( pagenum, 1));
    setlinkoption((newnum!=="" && newnum) ?Number(newnum): 0);
    setIsLoading(true);
  };
  const handleSlicing = (value) =>{
    if(slicing != value){
      setSlicing(value);
    }
  };
  return (
    <div>
      <EpisodeList
        episodeList={episodeList}
        handleEpisodeClick={handleEpisodeClick}
        currentPage={currentPage}
        enablenext={enablenext}
        goToNextPage={goToNextPage}
        slicing={slicing}
        goToPreviousPage={goToPreviousPage}
        handleJumpTo={handleJumpTo}
        handleSlicing={handleSlicing}
        lastepisodenumber={animeInfo?.episodes?.length}
      />
      <WatchorDownload linkoption={episodeLinks} animeId={animeInfo.id} isLoading={isLoading} />
    </div>
  );
};

export default EpisodesDisplay;
