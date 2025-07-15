import axios from 'axios';

// Create Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api', // For example: http://localhost:5000/api
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token on every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  // Optional: log requests during development
  if (import.meta.env.DEV) {
    console.log(`[Request] ${req.method.toUpperCase()} → ${req.url}`);
  }

  return req;
});

// Handle 401 errors and force logout
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(err);
  }
);

export default API;
