import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('_ADM_UNI_') : null;
  if (token) {
    const parsedToken = JSON.parse(token).token;
    config.headers.Authorization = `Bearer ${parsedToken}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (token expired)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('_ADM_UNI_');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;