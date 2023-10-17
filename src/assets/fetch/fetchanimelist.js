import { ANIME } from '@consumet/extensions';

export const FetchAnimeList = async (type,page) => {
    try {
        const gogoanime = new ANIME.Gogoanime();
        if(type == "recentRelease"){
            const res = await gogoanime.fetchRecentEpisodes(page, type);
            return res;

        }
        else if(type == "topAiring"){
            const res = await gogoanime.fetchTopAiring(page);
            return res;
        }
        else{
            const response = await fetch(`https://backendchopper.onrender.com/${type}?q=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            return jsonData;
        }

        
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; 
    }
}