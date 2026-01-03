import axios from 'axios'; // You must import axios here!

// This picks up the Vercel variable or falls back to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true 
});

export default api;