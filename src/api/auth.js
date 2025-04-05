import axiosClient from "./axiosClient";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://127.0.0.1:8000"; // Django backend

export async function login(username, password) {
  const res = await axiosClient.post(`${API_URL}/api/accounts/login/`, {
    username,
    password,
  });
  if (res.data.access) {
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
  }
  return res.data;
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

// ro‘lni decode
export function getUserRole() {
  const token = getAccessToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.role || null;
  } catch (err) {
    return null;
  }
}
