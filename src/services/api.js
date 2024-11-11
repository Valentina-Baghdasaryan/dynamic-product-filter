const API_BASE_URL = '/';

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}products.json`);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
};