// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // Replace with your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
  const { token } = JSON.parse(localStorage.getItem("userInfo"));

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const searchUsers = async (query) => {
  const response = await api.get(`/search?query=${query}`);
  return response.data;
};

export const sendFriendRequest = async (to) => {
  const response = await api.post("/friends/request", { to });
  return response.data;
};

export const getFriendRequests = async () => {
  const response = await api.get("/friends/requests");
  return response.data;
};

export const respondToFriendRequest = async (requestId, status) => {
  const response = await api.put(`/friends/request/${requestId}`, { status });
  return response.data;
};

export default api;
