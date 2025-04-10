// src/api/auth.js
import axiosClient from "../axiosConfig";
import { jwtDecode } from "jwt-decode"; // jwt-decode default eksport
import { navigate } from "../NavigationService";

const API_URL = "http://127.0.0.1:8000"; // Django backend

// 1) Register physical user
export async function registerPhysical({ username, password, phone_number }) {
  const res = await axiosClient.post(`${API_URL}/api/accounts/register/`, {
    username,
    password,
    phone_number,
  });
  return res.data; // Masalan, { id, username, is_active: false, ... }
}

// 2) Verify phone
export async function verifyPhone({ username, code }) {
  const res = await axiosClient.post(`${API_URL}/api/accounts/verify-phone/`, {
    username,
    code,
  });
  return res.data; // Masalan, { detail: "..." }
}

// 3) Login -> JWT
export async function login({ username, password }) {
  const res = await axiosClient.post(`${API_URL}/api/token/`, {
    username,
    password,
  });
  if (res.data.access) {
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
  }
  return res.data;
}

// 4) Logout: localStorage tozalanib, login sahifasiga yo'naltirish
export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  navigate("/login");
}

// 5) Get token, decode role
export function getAccessToken() {
  return localStorage.getItem("access_token");
}
export function getUserRole() {
  const token = getAccessToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.role || null; // misol: "admin", "operator", "courier", "physical", "legal"
  } catch (e) {
    return null;
  }
}

// 6) Admin user-list, user-detail (Misol)
export async function listUsers() {
  const token = getAccessToken();
  const res = await axiosClient.get(`${API_URL}/api/accounts/users/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // Masalan, [ { id, username, role, ... }, ... ]
}
export async function getUserDetail(id) {
  const token = getAccessToken();
  const res = await axiosClient.get(`${API_URL}/api/accounts/users/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
