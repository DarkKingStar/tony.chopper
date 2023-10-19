export const FetchUpcomingAnime = async(page) =>{
    try{
    const response = await fetch(`https://api.jikan.moe/v4/seasons/upcoming?page=${page}`);
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