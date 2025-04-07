// src/pages/operator/ApproveShipmentsPage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { listShipments, approveShipment } from "../../api/shipments";

export default function ApproveShipmentsPage() {
  const [pending, setPending] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await listShipments({ status: "client_created" });
      setPending(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Xatolik");
    }
  }

  async function handleApprove(id) {
    try {
      await approveShipment(id);
      setPending((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError("Approve xatolik: " + err.response?.data?.detail);
    }
  }

  return (
    <Container>
      <h2>Approve Shipments</h2>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <List>
        {pending.map((p) => (
          <li key={p.id}>
            {p.tracking_code} - {p.receiver_name}
            <button onClick={() => handleApprove(p.id)}>Approve</button>
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
