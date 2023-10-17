import {
    Pause,
    ArrowClockwise,
    ArrowCounterclockwise,
    PlayFill,
    VolumeUpFill,
    PauseFill,
    VolumeDownFill,
    VolumeOffFill,
    VolumeMuteFill,
    SkipEndFill,
    SkipStartFill,
    ThreeDotsVertical,
    Fullscreen,
    FullscreenExit
   } from "react-bootstrap-icons";
import "./VideoControls.css"
import { useState } from "react";

const VideoControls = ({
    videoTitle, 
    handleFullScreen,
    isFullscreen,
    SwitchTonextEpisode,
    SwitchToprevEpisode
    }) => {
    const [volume, setVolume] = useState(100);
    const [isMute,setIsMuted] = useState(false);
    const [isPlaying,setIsPlaying] = useState(true);

    //for play/pause
    const handlePlayPauseClick = () =>{
        setIsPlaying(prevValue => !prevValue);
    }
    
    
    //for volume
    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
        setIsMuted(false);
    }
    const handleSpeakerClick = () => {
        setVolume(prevVolume => {
            const newVolume = prevVolume == 0 ? 100 : 0;
            setIsMuted(newVolume == 0);
            return newVolume;
        });
    }
    return (<>
    <div className="player-controls">
    <div className="control_Container">

    <div className="top_container">
        <span className="textinVideo">{videoTitle}</span>
    </div>

    <div className="mid__container">
        <div className="icon__btn__mid">
            <ArrowCounterclockwise  />
        </div>
        <div className="icon__btn__mid">
            <span onClick={handlePlayPauseClick}>{isPlaying ? <PauseFill />: <PlayFill/>}</span>
        </div>
        <div className="icon__btn__mid">
            <ArrowClockwise/>
        </div>
    </div>

    <div className="bottom__container">
        <div className="slider__container">
        <div className="timespan__container textinVideo">
            <div className="currentTimeplayed">1:30</div>
            <span className="slash">&nbsp;/&nbsp;</span>
            <div className="totalDuration">12:30</div>
        </div>
        <input type="range" className="playtimeScroll"/>
        </div>
        <div className="control__box">
        <div className="inner__controls">
            <div className="inner__controls__left">
                <div className="icon__btn" onClick={SwitchToprevEpisode}>
                    <SkipStartFill />
                </div>
                <div className="icon__btn">
                    <span onClick={handlePlayPauseClick}>
                    {isPlaying ? <PauseFill/> : <PlayFill />}
                    </span>
                </div>
                <div className="icon__btn" onClick={SwitchTonextEpisode}>
                     <SkipEndFill  />
                </div>
            </div>
            <div className="inner__controls__right">
                <div className="icon__btn">
                <button title="Volume" id="volumeBtn" className="volumeBtn">
                    <span onClick={handleSpeakerClick}>
                        {isMute?<VolumeMuteFill/>:(volume == 0 ? <VolumeOffFill/> : (volume == 100 ? <VolumeUpFill/> : <VolumeDownFill/>))}
                    </span>
                    <span id="volume-range">
                        <input 
                        type="range" 
                        onChange={handleVolumeChange} 
                        className="volumeScroll" 
                        min="0" 
                        max="100" 
                        id="volume"
                        title={volume}
                        value={volume} 
                        />
                    </span>
                </button>
               </div>
               <div className="icon__btn" onClick={handleFullScreen}>
                    {isFullscreen?<FullscreenExit/>:<Fullscreen/>}
                </div>
                <div className="icon__btn">
                    <ThreeDotsVertical/>
                </div>
                
            </div>            
            </div>
        </div>
    </div>

    </div>
    </div>
    </>);
}

export default VideoControls;