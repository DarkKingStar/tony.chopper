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

const WatchPage = () =>{
    let { animeId } = useParams();
    const qvalue = new URLSearchParams(window.location.search).get('q');
    const epId = new URLSearchParams(window.location.search).get('e');
    const [link,setLink] = useState({});
    const [animeInfo,setAnimeInfo] = useState([]);
    const [loading,setLoading] = useState(true);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [currentEpisodeNumber,setCurrentEpisodeNumber] = useState(epId.slice(epId.lastIndexOf('-')+1));
    const navigate = useNavigate();
    useEffect(()=>{
        setCurrentEpisodeNumber(epId.slice(epId.lastIndexOf('-')+1))
    },[epId])
    useEffect(()=>{
        const fetchLink = async() =>{
            const data = await FetchVideoLink(epId);
            data?.sources.map( l=>{
                if(l.quality == qvalue)
                {
                    setLink(l.url);
                }
            })
            setLoading(false);
        }
        fetchLink();
    },[ epId, qvalue]);
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

        const SwitchTonextEpisode = () =>{
            if(Number(currentEpisodeNumber) + 1<=animeInfo.episodes.length){
                navigate(`/watch/${animeId}?e=${epId.slice(0,epId.lastIndexOf('-')+1)}${Number(currentEpisodeNumber)+1}&q=${qvalue}`)
            }
        }
        
        if (!animeInfo) {
          return <LoadingSpinner />;
        }
    return (
        <>
            {loading?<><LoadingSpinner/></>:
            <>
            <div className="container">
                <h1>{animeInfo?.title}</h1>
                <h2>Episode : {epId.split('-')[epId.split('-').length - 1]}</h2>
            </div>
            <div className='download-wrapper'>
                <button id="downloadEpisodebtn" onClick={handleDownload}>
                    Download
                </button>
                <div className='download-progress'>
                {downloadProgress > 0 && `Downloading: ${downloadProgress.toFixed(2)}%`}
                </div>
            </div>
            <div className='player-wrapper'>
                    <ReactPlayer
                    url={link}
                    controls
                    playing
                    muted
                    width="100%"
                    height="100%"
                    autoPlay
                    onEnded={SwitchTonextEpisode}
                    />
            </div>
            
            <EpisodesDisplay animeInfo={animeInfo} watchPageFlag={true} currentEpisodeNumber={epId.slice(epId.lastIndexOf('-')+1)}/>
            </>}
            
        </>
    );
}

export default WatchPage;