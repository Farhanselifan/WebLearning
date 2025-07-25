import axios from 'axios';
    
    const API_BASE_URL = 'http://localhost:3001';
    
    const api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Request interceptor
    api.interceptors.request.use(
      (config) => {
        console.log('Making request to:', config.url);
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
    
    export default api;