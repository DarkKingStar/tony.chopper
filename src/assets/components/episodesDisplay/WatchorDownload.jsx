import React from 'react';
import { useNavigate } from "react-router-dom"; 
import LoadingSpinner from '../../functions/LoadingSpinner';
const WatchorDownload = ({ linkoption, isLoading , animeId}) => {
  const navigate = useNavigate();
  return (
    <div className='video-option'>
      <h3>Watch Online OR Downlaod<br/><br/> Episode : {isLoading?(<>....</>):(linkoption?.number)}</h3>
      <h4>Watch Online</h4>
      {linkoption?.sources?.slice(0, 4).map((link) => (
        <button key={link?.quality} 
        className="reso-p-links" 
        disabled={isLoading} 
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
