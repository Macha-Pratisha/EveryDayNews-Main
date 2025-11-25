import axios from 'axios';

// Use Vite environment variable if available, otherwise fallback to default
const BASE_URL = import.meta.env.VITE_API_URL 
  || (import.meta.env.MODE === 'development' 
      ? 'http://localhost:5000/api'  // local dev backend
      : 'https://everydaynewsbackend.onrender.com/api'); // production Render backend

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // include cookies if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to request headers if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token'); // change key per portal if needed
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwt_token'); // remove token
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

