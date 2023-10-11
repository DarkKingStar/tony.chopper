import React from 'react';
import { useNavigate } from "react-router-dom"; 
import FadeInFromRight from '../../functions/FadeInFromRight';
import FadeInFromLeft from '../../functions/FadeinFromLeft';
import ScaleIn from '../../functions/ScaleIn';
const WatchorDownload = ({ linkoption, isLoading , animeId}) => {
  const navigate = useNavigate();
  const qvalue = new URLSearchParams(window.location.search).get('q');
  return (
    <div className='video-option'>
      <FadeInFromRight value={<>
      <h3>Select the Video Quality<br/><br/> Episode : {isLoading?(<>....</>):(linkoption?.number)}</h3>
      </>}/>
      <FadeInFromLeft value={<>
      <h4>Watch Online</h4>
      </>}/>
      <FadeInFromRight value={<>
      {linkoption?.sources?.map((link) => (
        <button key={link?.quality} 
        style={{display:`${/^\d/.test(link?.quality)?'content':'none'}`}}
        disabled={isLoading}
        className={`${(qvalue == link?.quality)?'reso-p-links currentactive-btn':'reso-p-links'}`}
        onClick={() => navigate(`/watch/${animeId}?e=${linkoption.id}&q=${link?.quality}`)} >
          <ScaleIn value={link?.quality}/>
        </button>
      ))}
      </>}/>
      <FadeInFromLeft value={<>
      <h4>Download from Vidstream</h4>
      </>}/>
      <FadeInFromRight value={<>
      <a target="_blank" href={linkoption?.download}>
        <button disabled={isLoading}><ScaleIn value={"Download"}/></button>
      </a>
      </>}/>
    </div>
  );
};
export default WatchorDownload;
