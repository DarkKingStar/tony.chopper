export const FetchAnimeList = async (url) => {
    try {
        const response = await fetch(`https://backendchopper.onrender.com/${url}`);
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