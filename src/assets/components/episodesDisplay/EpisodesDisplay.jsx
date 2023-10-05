// EpisodesDisplay.js
import React, { useEffect, useState } from 'react';
import EpisodeList from './EpisodeList';
import WatchorDownload from './WatchorDownload';
import { FetchVideoLink } from '../../fetch/fetchvideolink';
import { useNavigate, useParams } from 'react-router-dom';
const EpisodesDisplay = ({
 animeInfo, watchPageFlag, currentEpisodeNumber
}) => {
  const [episodeLinks, setEpisodeLinks] = useState([]);
  const [episodeList, setEpisodeList] = useState([]);
  const [linkoption, setlinkoption] = useState(currentEpisodeNumber || 1);
  const [currentPage, setCurrentPage] = useState((Math.ceil(Number(currentEpisodeNumber)/20)) || 1);
  const [isLoading, setIsLoading] = useState(true);
  const [slicing,setSlicing] = useState(20);
  const [start,setStart] = useState((20*(Math.ceil(Number(currentEpisodeNumber)/20)-1)) || 0);
  const [enablenext,setEnablenext] = useState(true);
  const navigate = useNavigate();
  let { animeId } = useParams();
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
    if(watchPageFlag){
      const qvalue = new URLSearchParams(window.location.search).get('q');
      const evalue = new URLSearchParams(window.location.search).get('e');
      navigate(`/watch/${animeId}?e=${evalue.slice(0,evalue.lastIndexOf('-')+1)+ epnum}&q=${qvalue}`);
    }
    setlinkoption(epnum);
    setIsLoading(true);
  };

  const goToNextPage = () => {
    setCurrentPage(prev => prev + 1);
    setStart(prev=> prev + slicing);
    //setlinkoption(prev =>  prev + slicing);
     // setIsLoading(true);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max( prev - 1, 1));
    setStart(prev=> Math.max((prev - slicing),0));
    //setlinkoption(prev =>  Math.max(prev - slicing,1));
    // setIsLoading(true);
  };

  const handleJumpTo = (newnum) => {
    const pagenum = parseInt(Number(newnum)/slicing);
    setCurrentPage(Math.max( pagenum, 1));
    setStart(Math.max( pagenum-1 , 1)*slicing);
    setlinkoption((newnum!=="" && newnum) ?Number(newnum): 0);
    setIsLoading(true);
  };
  const handleSlicing = (value) =>{
    if(slicing != value){
      setSlicing(value);
      setCurrentPage(Math.ceil(Number(linkoption)/value))
      setStart(value*(Math.ceil(Number(linkoption)/value)-1));
    }
  };
  return (
    <div>
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
      />
      <WatchorDownload linkoption={episodeLinks} animeId={animeInfo.id} isLoading={isLoading} />
    </div>
  );
};

export default EpisodesDisplay;