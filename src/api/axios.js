import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://doctor-appointment-backend-yn0t.onrender.com/",
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