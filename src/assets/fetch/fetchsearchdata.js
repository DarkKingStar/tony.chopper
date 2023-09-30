export const FetchSearchData = async(query)=>{
    try {
        const response = await fetch(`https://backendchopper.onrender.com/anime?q=${query}`);
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