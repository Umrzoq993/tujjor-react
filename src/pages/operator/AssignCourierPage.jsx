// src/pages/operator/AssignCourierPage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { listShipments, assignCourier } from "../../api/shipments";

export default function AssignCourierPage() {
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState("");
  const [courierId, setCourierId] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await listShipments({ status: "approved" }); // masalan, approved bo‘lsa
      setShipments(data);
    } catch (err) {
      setError("Xatolik: " + err.response?.data?.detail);
    }
  }

  async function handleAssign(shipmentId) {
    try {
      await assignCourier(shipmentId, courierId);
      alert("Assigned!");
    } catch (err) {
      setError("Assign xato: " + err.response?.data?.detail);
    }
  }

  return (
    <Container>
      <h2>Assign Courier</h2>
      {error && <ErrorMsg>{error}</ErrorMsg>}

      <div style={{ margin: "1rem 0" }}>
        <label>Courier ID:</label>
        <input
          type="number"
          value={courierId}
          onChange={(e) => setCourierId(e.target.value)}
          style={{ marginLeft: "1rem" }}
        />
      </div>

      <List>
        {shipments.map((s) => (
          <li key={s.id}>
            {s.tracking_code} - {s.receiver_name}, status={s.status}
            <button onClick={() => handleAssign(s.id)}>Assign</button>
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
  margin-bottom: 1rem;
  padding: 0.5rem;
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
