// src/axiosConfig.js
import axiosClient from "./api/axiosClient";
import { toast } from "react-toastify";

// Auth util funksiyalari (o'zingizning auth.js dan)
export function getAccessToken() {
  return localStorage.getItem("access");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh");
}

export function setAccessToken(token) {
  localStorage.setItem("access", token);
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/login"; // yoki o'zingiz istagan logout sahifasi
}

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { "Content-Type": "application/json" },
});

// Har bir so'rovga access token qo'shish
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

// Agar 401 xatolik yuz bersa, refresh token orqali yangi access token olish
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            { refresh: refreshToken }
          );
          if (response.data.access) {
            setAccessToken(response.data.access);
            originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
            return axiosClient(originalRequest);
          }
        } catch (refreshError) {
          toast.error("Session expired. Please log in again.", {
            position: "top-center",
            autoClose: 2000,
          });
          logout();
          return Promise.reject(refreshError);
        }
      } else {
        toast.error("Session expired. Please log in again.", {
          position: "top-center",
          autoClose: 2000,
        });
        logout();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
