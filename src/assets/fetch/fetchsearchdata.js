import { ANIME } from '@consumet/extensions';
export const FetchSearchData = async(query)=>{
    try {
        const gogoanime = new ANIME.Gogoanime();
        const response = await gogoanime.search(query);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; 
    }
}