export async function fetchSpeciesList() {
    const API_KEY = process.env.PLANT_DOC_API_KEY;
    const URL = `https://perenual.com/api/species-list?key=${API_KEY}`;

    try {
        const response = await fetch(URL);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}
