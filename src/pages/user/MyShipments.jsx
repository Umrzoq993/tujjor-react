// src/pages/user/MyShipmentsPage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { listShipments } from "../../api/shipments";

export default function MyShipments() {
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadShipments();
  }, []);

  async function loadShipments() {
    try {
      const data = await listShipments();
      // Agar paginatsiya javobi bo'lsa, data.results bo'ladi, aks holda data array bo'lishi mumkin.
      const shipmentsArray = Array.isArray(data) ? data : data.results || [];
      setShipments(shipmentsArray);
    } catch (err) {
      setError(err.response?.data?.detail || "Xatolik yuz berdi");
    }
  }

  return (
    <Container>
      <h2>My Shipments</h2>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <ShipmentList>
        {shipments.map((s) => (
          <ShipmentItem key={s.id}>
            <strong>Tracking:</strong> {s.tracking_code}{" "}
            <strong>Status:</strong> {s.status} <strong>Price:</strong>{" "}
            {s.price}
          </ShipmentItem>
        ))}
      </ShipmentList>
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

const ErrorMsg = styled.div`
  background: #ffe3e3;
  color: #900;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-left: 3px solid #f00;
`;

const ShipmentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ShipmentItem = styled.li`
  margin-bottom: 0.5rem;
  background: #fafafa;
  border: 1px solid #ccc;
  padding: 0.5rem;
`;
