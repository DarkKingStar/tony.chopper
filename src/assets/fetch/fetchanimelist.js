import { ANIME } from '@consumet/extensions';

export const FetchAnimeList = async (type,page) => {
    try {
        const response = await fetch(`https://tony-tony-chopper.onrender.com/${type}?p=${page}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; 
    }
}