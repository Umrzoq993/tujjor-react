// src/pages/courier/CourierPage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { listShipments, changeShipmentStatus } from "../../api/shipments";

export default function CourierDashboard() {
  const [myShipments, setMyShipments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      // backendda 'courier' user => faqat o‘ziga assigned bo‘lgan shipments qaytadi
      const data = await listShipments();
      setMyShipments(data);
    } catch (err) {
      setError("Xatolik: " + err.response?.data?.detail);
    }
  }

  async function handleStatus(id, newStatus) {
    try {
      await changeShipmentStatus(id, newStatus);
      load();
    } catch (err) {
      setError("Holat o‘zgartirishda xato: " + err.response?.data?.detail);
    }
  }

  return (
    <Container>
      <h2>Courier Panel</h2>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <List>
        {myShipments.map((sh) => (
          <li key={sh.id}>
            {sh.tracking_code} - {sh.receiver_name}, status={sh.status}
            {sh.status === "in_transit" && (
              <button onClick={() => handleStatus(sh.id, "arrived")}>
                Arrived
              </button>
            )}
            {sh.status === "arrived" && (
              <button onClick={() => handleStatus(sh.id, "delivered")}>
                Delivered
              </button>
            )}
          </li>
        ))}
      </List>
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
`;
const ErrorMsg = styled.div`
  background: #ffe3e3;
  color: #900;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;
const List = styled.ul`
  list-style: none;
  li {
    margin-bottom: 0.5rem;
    background: #fff;
    border: 1px solid #ccc;
    padding: 0.5rem;
    button {
      margin-left: 1rem;
      background: #333;
      color: #fff;
      border: none;
      padding: 0.3rem 0.6rem;
      cursor: pointer;
    }
  }
`;
