// src/api/branches.js
import axios from "axios";
import { getAccessToken } from "./auth";

const API_URL = "http://127.0.0.1:8000";

export async function listBranches() {
  const token = getAccessToken();
  const res = await axios.get(`${API_URL}/api/branches/branches/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // [ {id, name, address, parent_branch,...}, ... ]
}
