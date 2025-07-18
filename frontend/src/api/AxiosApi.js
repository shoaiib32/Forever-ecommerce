// src/api/axiosApi.js
import axios from "axios";

const AxiosAPI = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
    version: "1.1.15",
  },
});

AxiosAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default AxiosAPI;
