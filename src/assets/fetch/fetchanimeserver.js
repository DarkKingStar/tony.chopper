import { ANIME } from '@consumet/extensions';

export const FetchAnimeServer = async(epId)=>{
    try {
        const gogoanime = new ANIME.Gogoanime();
        const res = await gogoanime.fetchEpisodeServers(epId);
        return res;

    } catch (error) {
        console.error('Error fetching data:', error);
        return null; 
    }
}