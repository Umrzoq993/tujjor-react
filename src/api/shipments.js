// src/api/shipments.js
import axiosClient from "../axiosConfig";
import { getAccessToken } from "./auth";

const API_URL = "http://127.0.0.1:8000";

// Mavjud funksiyalar:
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
  return res.data;
}

export async function listShipmentHistory(params = {}) {
  const token = getAccessToken();
  const res = await axiosClient.get(
    `${API_URL}/api/shipments/shipment-status-history/`,
    {
      params,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function trackShipment(tracking_code) {
  const res = await axiosClient.get(
    `${API_URL}/api/shipments/track/${tracking_code}/`
  );
  return res.data;
}

export async function changeShipmentStatus(shipmentId, newStatus) {
  const token = getAccessToken();
  const res = await axiosClient.post(
    `${API_URL}/api/shipments/shipments/${shipmentId}/change_status/`,
    { status: newStatus },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function assignCourier(shipmentId, courierId) {
  const token = getAccessToken();
  const res = await axiosClient.post(
    `${API_URL}/api/shipments/shipments/${shipmentId}/assign_courier/`,
    { courier_id: courierId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function approveShipment(shipmentId) {
  const token = getAccessToken();
  const res = await axiosClient.post(
    `${API_URL}/api/shipments/shipments/${shipmentId}/approve/`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

// Yangi qo'shilayotgan funksiyalar:
export async function updateShipment(shipmentId, data) {
  const token = getAccessToken();
  const res = await axiosClient.put(
    `${API_URL}/api/shipments/shipments/${shipmentId}/`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function deleteShipment(shipmentId) {
  const token = getAccessToken();
  const res = await axiosClient.delete(
    `${API_URL}/api/shipments/shipments/${shipmentId}/`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}
