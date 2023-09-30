import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { FetchVideoLink } from '../../fetch/fetchvideolink';
import LoadingSpinner from '../../functions/LoadingSpinner';
import { FetchAnimeInfo } from '../../fetch/fetchanimeinfo';
import ReactPlayer from 'react-player';
import InfoPage from './InfoPage';
import EpisodesDisplay from '../episodesDisplay/EpisodesDisplay';
import "./WatchPage.css"

const WatchPage = () =>{
    let { animeId } = useParams();
    const qvalue = new URLSearchParams(window.location.search).get('q')
    const epId = new URLSearchParams(window.location.search).get('e');
    const [link,setLink] = useState({});
    const [animeInfo,setAnimeInfo] = useState([]);
    const [loading,setLoading] = useState(true);
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
            <div className='player-wrapper'>
                    <ReactPlayer
                    url={link}
                    controls
                    playing
                    muted
                    width="100%"
                    height="100%"
                    autoPlay
                    />
            </div>
            <EpisodesDisplay animeInfo={animeInfo}/>
            </>}
            
        </>
    );
}

export default WatchPage;