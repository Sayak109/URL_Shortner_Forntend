import axios from "axios";

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3322";
const API_SLUG = process.env.REACT_APP_API_SLUG || "/api/v1";

// Create axios instance with proper configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable credentials to send cookies
});

// Request interceptor - no need to add token manually as it's in cookies
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Test API endpoint
export const testAPI = {
  test: () => api.get(`${API_SLUG}/test`),
};

// Auth API endpoints
export const authAPI = {
  login: (credentials) => api.post(`${API_SLUG}/signin`, credentials),
  register: (userData) => api.post(`${API_SLUG}/signup`, userData),
  logout: () => api.post(`${API_SLUG}/logout`),
  getUser: () => api.get(`${API_SLUG}/user/me`),
  googleLogin: (credential) => api.post(`${API_SLUG}/google`, { credential }),
};

// URL API endpoints
export const urlAPI = {
  getUrlList: () => api.get(`${API_SLUG}/url/url-list`),
  shortenUrl: (longUrl) =>
    api.post(`${API_SLUG}/url/shorten-url`, { long_url: longUrl }),
  deleteUrl: (urlId) => api.delete(`${API_SLUG}/url/${urlId}`),
};

export default api;
