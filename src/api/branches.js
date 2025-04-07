// src/api/branches.js
import axiosClient from "../axiosConfig";
import { getAccessToken } from "./auth";

const API_URL = "http://127.0.0.1:8000";

export async function listBranches() {
  const token = getAccessToken();
  const res = await axiosClient.get(`${API_URL}/api/branches/branches/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // [ {id, name, address, parent_branch,...}, ... ]
}
