import ReactPlayer from 'react-player';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import VideoControls from '../functions/VideoControls';
const VideoPlayer = ({link, currentEpisodeNumber, totalnumberofepisode, videoTitle}) =>{
    const qvalue = new URLSearchParams(window.location.search).get('q');
    const epId = new URLSearchParams(window.location.search).get('e');
    let { animeId } = useParams();
    const navigate = useNavigate();

    const [isMuted, setIsMuted] = useState(true);
    const [isFullscreen,setIsFullscreen] = useState(false);
    const videoContainerRef = useRef(null);
    
    const SwitchTonextEpisode = () =>{
        if(Number(currentEpisodeNumber) + 1<= totalnumberofepisode){
            navigate(`/watch/${animeId}?e=${epId.slice(0,epId.lastIndexOf('-')+1)}${Number(currentEpisodeNumber)+1}&q=${qvalue}`)
        }
    }
    const SwitchToprevEpisode = () =>{
        if(Number(currentEpisodeNumber) > 1 ){
            navigate(`/watch/${animeId}?e=${epId.slice(0,epId.lastIndexOf('-')+1)}${Number(currentEpisodeNumber)-1}&q=${qvalue}`)
        }
    }
    
    const handleUnmute = () => {
        setIsMuted(false);
    }

    const handleFullScreen = () => {
        if (!isFullscreen) {
          videoContainerRef.current.requestFullscreen();
          setIsFullscreen(true);
        } else {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      };

    return(<>

    <div className='player-wrapper' ref={videoContainerRef}>    
        <ReactPlayer
        className="React-Player"
        url={link}
        playing
        muted={isMuted} 
        width="100%"
        height="100%"
        autoPlay
        controls
        onEnded={SwitchTonextEpisode}
        onStart={handleUnmute}
        
        />
        {/* <VideoControls 
        videoTitle={videoTitle}
        handleFullScreen={handleFullScreen}
        isFullscreen={isFullscreen}
        SwitchTonextEpisode={SwitchTonextEpisode}
        SwitchToprevEpisode={SwitchToprevEpisode}
        /> */}
    </div>
    </>)
}
export default VideoPlayer