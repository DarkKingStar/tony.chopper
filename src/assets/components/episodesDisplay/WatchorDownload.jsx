import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import FadeInFromRight from '../../functions/FadeInFromRight';
import FadeInFromLeft from '../../functions/FadeinFromLeft';
import ScaleIn from '../../functions/ScaleIn';
import { FetchVideoLink } from '../../fetch/fetchvideolink';
const WatchorDownload = ({ linkoption, animeInfo }) => {
  const navigate = useNavigate();
  const qvalue = new URLSearchParams(window.location.search).get('q');

  const [isLoading,setIsLoading] = useState(true);
  const [videoLink,setVideoLink] = useState(null);

  useEffect(()=>{
    const episodelink = async() =>{
      try{
        if(animeInfo){
          setIsLoading(true);
          const episodeId = animeInfo?.episodes[linkoption-1]?.id;
          const link = await FetchVideoLink(episodeId);
          setVideoLink(link);
          setIsLoading(false);
        }
      }catch(err){
        console.log(err);
      }
    }
    episodelink();
  },[linkoption,animeInfo])
  return (
    <div className='video-option'>
      <FadeInFromRight value={<>
      <h3>Select the Video Quality<br/><br/> Episode : {isLoading?(<>....</>):(linkoption)}</h3>
      </>}/>
      <FadeInFromLeft value={<>
      <h4>Watch Online</h4>
      </>}/>
      <FadeInFromRight value={<>
      {videoLink?.sources?.map((link) => (
        <button key={link?.quality} 
        style={{display:`${/^\d/.test(link?.quality)?'content':'none'}`}}
        disabled={isLoading}
        className={`${(qvalue == link?.quality)?'reso-p-links currentactive-btn':'reso-p-links'}`}
        onClick={() => navigate(`/watch/${animeInfo.id}?e=${animeInfo.episodes[linkoption-1].id}&q=${link?.quality}`)} >
          <ScaleIn value={link?.quality}/>
        </button>
      ))}
      </>}/>
      <FadeInFromLeft value={<>
      <h4>Download from Vidstream</h4>
      </>}/>
      <FadeInFromRight value={<>
      <a target="_blank" href={videoLink?.download}>
        <button disabled={isLoading}><ScaleIn value={"Download"}/></button>
      </a>
      </>}/>
    </div>
  );
};
export default WatchorDownload;
