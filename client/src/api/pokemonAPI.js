import axios from 'axios';

const REACT_APP_POKEMON_API_URL = process.env.REACT_APP_POKEMON_API_URL

// Create an Axios instance
const pokemonAPI = axios.create({
  baseURL: REACT_APP_POKEMON_API_URL
});

// Add a request unauth interceptor
pokemonAPI.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('pokemon_combat_token');
    // If there's a token, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response un auth interceptor
pokemonAPI.interceptors.response.use(
  response => {
    // Return the response if it's successful
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      // Handle the 401 status code here
      // Optionally, you could show a message to the user before reloading
      localStorage.removeItem('pokemon_combat_token');
      window.location.reload(); // Reload the app
    }
    // Forward the error for further handling
    return Promise.reject(error);
  }
);

export default pokemonAPI;
