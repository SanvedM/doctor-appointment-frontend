import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (!refresh) return Promise.reject(error);

      const res = await axios.post(`${baseURL}token/refresh/`, {
        refresh,
      });

      localStorage.setItem("access", res.data.access);
      originalRequest.headers.Authorization =
        `Bearer ${res.data.access}`;

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
