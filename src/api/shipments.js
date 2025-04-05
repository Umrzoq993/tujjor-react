import axiosClient from "./axiosClient";
import { getAccessToken } from "./auth";

const API_URL = "http://127.0.0.1:8000";

export async function createShipment(data) {
  const token = getAccessToken();
  const res = await axiosClient.post(
    `${API_URL}/api/shipments/shipments/`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function listShipments(params = {}) {
  const token = getAccessToken();
  const res = await axiosClient.get(`${API_URL}/api/shipments/shipments/`, {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.results;
}

export async function approveShipment(shipmentId) {
  const token = getAccessToken();
  const res = await axiosClient.post(
    `${API_URL}/api/shipments/shipments/${shipmentId}/approve/`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function changeStatus(shipmentId, newStatus) {
  const token = getAccessToken();
  const res = await axiosClient.post(
    `${API_URL}/api/shipments/shipments/${shipmentId}/change_status/`,
    { status: newStatus },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function trackShipment(trackingCode) {
  // track endpoint public bo‘lishi mumkin
  const res = await axiosClient.get(
    `${API_URL}/api/shipments/track/${trackingCode}/`
  );
  return res.data;
}
