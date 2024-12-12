import { getToken } from "./authenticate";

// Add to Favourites
export async function addToFavourites(id) {
    try {
        // Get the authentication token
        const token = await getToken();

        // Make PUT request to favourites endpoint
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `JWT ${token}`
            }
        });

       
        if (res.status === 200) {
            return await res.json();
        }
        return [];
    } catch (error) {
        return [];
    }
}

// Remove from Favourites
export async function removeFromFavourites(id) {
    try {
        // Get the authentication token
        const token = await getToken();

        // Make DELETE request to favourites endpoint
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `JWT ${token}`
            }
        });

        // Return data if successful, otherwise empty array
        if (res.status === 200) {
            return await res.json();
        }
        return [];
    } catch (error) {
        return [];
    }
}

// Get Favourites
export async function getFavourites() {
    try {
        // Get the authentication token
        const token = await getToken();

        // Make GET request to favourites endpoint
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${token}`
            }
        });

        // Return data if successful, otherwise empty array
        if (res.status === 200) {
            return await res.json();
        }
        return [];
    } catch (error) {
        return [];
    }
}

// Add to History
export async function addToHistory(id) {
    try {
        // Get the authentication token
        const token = await getToken();

        // Make PUT request to history endpoint
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `JWT ${token}`
            }
        });

        // Return data if successful, otherwise empty array
        if (res.status === 200) {
            return await res.json();
        }
        return [];
    } catch (error) {
        return [];
    }
}

// Remove from History
export async function removeFromHistory(id) {
    try {
        // Get the authentication token
        const token = await getToken();

        // Make DELETE request to history endpoint
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `JWT ${token}`
            }
        });

        // Return data if successful, otherwise empty array
        if (res.status === 200) {
            return await res.json();
        }
        return [];
    } catch (error) {
        return [];
    }
}

// Get History
export async function getHistory() {
    try {
        // Get the authentication token
        const token = await getToken();

        // Make GET request to history endpoint
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${token}`
            }
        });

        // Return data if successful, otherwise empty array
        if (res.status === 200) {
            return await res.json();
        }
        return [];
    } catch (error) {
        return [];
    }
}