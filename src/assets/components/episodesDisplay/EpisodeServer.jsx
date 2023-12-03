import { useEffect, useState } from "react";
import { FetchAnimeServer } from "../../fetch/fetchanimeserver";

function EpisodeServer(
    {linkoption, animeInfo, handlechangeServer, setCurrentServer, setServerList, serverList}
) {
    useEffect(()=>{
        const fetchServer = async() =>{
            try{
                if(animeInfo){
                    const currentepisode = animeInfo.episodes[linkoption-1] || null;
                    const episodeId = currentepisode.id || null;
                    if(episodeId != null){
                        const servers = await FetchAnimeServer(episodeId);
                        
                        setServerList(servers);
                        setCurrentServer(servers[0]);
                    }
                }
            }catch(err){
                console.error(err);
            }
        }
        fetchServer();
    },[linkoption, animeInfo]);
       
    return (<>
        <select onChange={(e) => handlechangeServer(e)}>
            {serverList?.map((server,index)=>(
                <option key={server.name} value={index}>{server.name}</option>
            ))}
        </select>
    </>);
}

export default EpisodeServer;