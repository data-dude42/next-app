function setToken(token) {
    localStorage.setItem('access_token', token);
}

function getToken() {
    try {
        return localStorage.getItem('access_token');
    } catch (err) {
        return null;
    }
}

function removeToken() {
    localStorage.removeItem('access_token');
}

import { jwtDecode } from 'jwt-decode';

// ...

function readToken() {
    try {
        const token = getToken();
        return token ? jwtDecode(token) : null;
    } catch (err) {
        return null;
    }
}


function isAuthenticated() {
    const token = readToken();
    return token ? true : false;
}


async function authenticateUser(user, password) {
    // Remove the extra "/user" from the path
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/`, {
        method: 'POST',
        body: JSON.stringify({ userName: user, password: password }),
        headers: {
            'content-type': 'application/json',
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        setToken(data.token);
        return true;
    } else {
        throw new Error(data.message);
    }
}


// Implementation of registerUser
async function registerUser(user, password, password2) {
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: user,
                password: password,
                password2: password2,
            }),
        });

        if (response.ok) {
            // Registration succeeded; no token is set, just return true
            return true;
        } else {
            // Handle non-successful response
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }
    } catch (err) {
        console.error("Error during registration:", err.message);
        return false;
    }
}

export {
    setToken,
    getToken,
    removeToken,
    readToken,
    isAuthenticated,
    authenticateUser,
    registerUser,
};