import React from 'react';
import { useNavigate } from "react-router-dom"; 
const WatchorDownload = ({ linkoption, isLoading , animeId}) => {
  const navigate = useNavigate();
  const qvalue = new URLSearchParams(window.location.search).get('q');
  return (
    <div className='video-option'>
      <h3>Watch Online OR Downlaod<br/><br/> Episode : {isLoading?(<>....</>):(linkoption?.number)}</h3>
      <h4>Watch Online</h4>
      {linkoption?.sources?.map((link) => (
        <button key={link?.quality} 
        disabled={isLoading}
        className={`${(qvalue == link?.quality)?'reso-p-links currentepisode':'reso-p-links'}`}
        onClick={() => navigate(`/watch/${animeId}?e=${linkoption.id}&q=${link?.quality}`)} >
          {link?.quality}
        </button>
      ))}
      <h4>Download from Vidstream</h4>
      <a target="_blank" href={linkoption?.download}>
        <button disabled={isLoading}>Download</button>
      </a>
    </div>
  );
};
export default WatchorDownload;
