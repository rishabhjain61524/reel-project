import api from '../api/api';

// This line automatically picks the Vercel URL when live, or localhost when offline
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true // Required if you use cookies or sessions
});

export default api;