// src/api/payments.js
import axios from "axios";
import { getAccessToken } from "./auth";

const API_URL = "http://127.0.0.1:8000";

// create payment
export async function createPayment(data) {
  const token = getAccessToken();
  const res = await axios.post(`${API_URL}/api/payments/payments/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { id, user, shipment, amount, status='pending' }
}

// pay action
export async function payPayment(paymentId) {
  const token = getAccessToken();
  const res = await axios.post(
    `${API_URL}/api/payments/payments/${paymentId}/pay/`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data; // {detail: "..."}
}
