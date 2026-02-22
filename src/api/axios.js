import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 endpoints that DO NOT need token
const publicEndpoints = [
  "login",
  "doctors",
  "register",
];

// 🔥 AUTO ATTACH TOKEN (smart)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const url = (config.url || "").replace(/^\/+/, "").toLowerCase();

  const isPublic = publicEndpoints.includes(url);

  console.log("URL:", url);
  console.log("IS PUBLIC:", isPublic);
  console.log("TOKEN:", token);

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;