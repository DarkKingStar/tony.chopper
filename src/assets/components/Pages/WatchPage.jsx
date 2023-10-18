import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { FetchVideoLink } from '../../fetch/fetchvideolink';
import LoadingSpinner from '../../functions/LoadingSpinner';
import { FetchAnimeInfo } from '../../fetch/fetchanimeinfo';
import ReactPlayer from 'react-player';
import EpisodesDisplay from '../episodesDisplay/EpisodesDisplay';
import "./WatchPage.css"
import { M3u8toMp4 } from '../../fetch/m3u8tomp4';
import { useNavigate } from 'react-router-dom';
import FadeInFromLeft from '../../functions/FadeinFromLeft';
import FadeInFromRight from '../../functions/FadeInFromRight';
import ScaleIn from '../../functions/ScaleIn';
import VideoPlayer from '../VideoPlayer';

const WatchPage = () =>{
    let { animeId } = useParams();
    const qvalue = new URLSearchParams(window.location.search).get('q');
    const epId = new URLSearchParams(window.location.search).get('e');
    const [link,setLink] = useState(null);
    const [animeInfo,setAnimeInfo] = useState([]);
    const [loading,setLoading] = useState(true);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [currentEpisodeNumber,setCurrentEpisodeNumber] = useState(epId.slice(epId.lastIndexOf('-')+1));
    // const [isMuted, setIsMuted] = useState(true);
    // const navigate = useNavigate();
    useEffect(()=>{
        setCurrentEpisodeNumber(epId.slice(epId.lastIndexOf('-')+1))
    },[epId])
    useEffect(()=>{
        const fetchLink = async() =>{
            try{
                const data = await FetchVideoLink(epId);
                data?.sources.map( l=>{
                    if(l.quality == qvalue)
                    {
                        setLink(l.url);
                    }
                })
                window.scrollTo(0, 0);
            }catch(err){
                window.scrollTo(0, 0);
            }
            setLoading(false);
        }
        fetchLink();
    },[ epId, qvalue, currentEpisodeNumber]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchAnimeInfo(animeId);
                setAnimeInfo(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        }, [animeId]);
        
        const handleDownload = async () => {
            const dwnldbtn = document.getElementById("downloadEpisodebtn");
            try{
                dwnldbtn.disabled = true;
                const videoUrl = await M3u8toMp4(link, progress => {
                    setDownloadProgress(progress);
                });
                const a = document.createElement('a');
                a.href = videoUrl;
                a.download = `E${epId.split('-')[epId.split('-').length - 1]}-${qvalue}-${animeId}.mp4`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }catch(err){
                console.log("can't download : "+err);
            }finally{
                dwnldbtn.disabled = false;
                setDownloadProgress(0);
            }
        }

        // const SwitchTonextEpisode = () =>{
        //     if(Number(currentEpisodeNumber) + 1<=animeInfo.episodes.length){
        //         navigate(`/watch/${animeId}?e=${epId.slice(0,epId.lastIndexOf('-')+1)}${Number(currentEpisodeNumber)+1}&q=${qvalue}`)
        //     }
        // }
        // const handleUnmute = () => {
        //     setIsMuted(false);
        // }
        if (loading) {
          return <LoadingSpinner />;
        }
        if (!link) {
            return <Error404Page />; // Render a 404 error page here
          }
    return (
        <>
            {loading?<><LoadingSpinner/></>:
            <div style={{overflow:"hidden"}}>
            <div className="container">
               <FadeInFromLeft value={<h1>{animeInfo?.title}</h1>}/>
                <FadeInFromRight value={<h2>Episode : {epId.split('-')[epId.split('-').length - 1]} {"("}{qvalue}{")"}</h2>}/>
            </div>
            <div className='download-wrapper'>
                <FadeInFromLeft value={
                    <button id="downloadEpisodebtn" onClick={handleDownload}>
                        <ScaleIn value={"Download"}/>
                    </button>
                }/>
                <div className='download-progress'>
                {downloadProgress > 0 && `Downloading: ${downloadProgress.toFixed(2)}%`}
                </div>
            </div>
            <FadeInFromRight value={
            <>
            <div className="container">
            <VideoPlayer 
            link={link} 
            currentEpisodeNumber={currentEpisodeNumber} 
            totalnumberofepisode={animeInfo?.episodes?.length} 
            videoTitle={`${animeInfo?.title} Ep${currentEpisodeNumber} ${qvalue}`}/>
            </div>
            {/* <div className='player-wrapper'>
                    <ReactPlayer
                    url={link}
                    controls
                    playing
                    muted={isMuted} 
                    width="100%"
                    height="100%"
                    autoPlay
                    onEnded={SwitchTonextEpisode}
                    onStart={handleUnmute}
                    />
            </div> */}
            </>
            }/>
            <EpisodesDisplay animeInfo={animeInfo} watchPageFlag={true} currentEpisodeNumber={epId.slice(epId.lastIndexOf('-')+1)}/>
            </div>}
            
        </>
    );
}

const Error404Page = () => {
    return (
      <div className='error-page'>
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  };

export default WatchPage;