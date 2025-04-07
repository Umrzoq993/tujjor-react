// src/axiosConfig.js
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

// Auth util funksiyalari
export function getAccessToken() {
  return localStorage.getItem("access");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh");
}

export function setAccessToken(token) {
  localStorage.setItem("access", token);
}

// Yangi axios instance yarataylik
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: access token qo'shish
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: agar token muddati tugasa refresh qilish
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Agar 401 xatolik va originalRequest hali refresh qilingan bo'lmasa
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // refresh jarayoni takrorlanmasligi uchun
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          // Agar refresh token yo'q bo'lsa, logout qilamiz
          toast.error("Session tugagan, qayta login qiling");
          window.location.href = "/login";
          return Promise.reject(error);
        }
        // Refresh token endpoint: /api/token/refresh/
        const response = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          { refresh: refreshToken }
        );
        if (response.data.access) {
          setAccessToken(response.data.access);
          // Yangi token bilan original so'rovni qayta yuboramiz
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        toast.error("Session tugagan, qayta login qiling");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
