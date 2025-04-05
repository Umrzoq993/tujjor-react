import axios from "axios";
import { getAccessToken, logout } from "./auth";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// request interceptor
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

// response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // token xato yoki eskirgan
        logout();
        toast.error("Session tugagan. Iltimos, qayta login qiling.");
      } else if (error.response.status >= 400 && error.response.status < 500) {
        toast.error(error.response.data?.detail || "Xato so‘rov");
      } else if (error.response.status >= 500) {
        toast.error("Serverda xatolik yuz berdi");
      }
    } else {
      toast.error("Tarmoq xatosi yoki server topilmadi");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
