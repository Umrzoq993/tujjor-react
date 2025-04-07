// src/pages/user/CreateShipmentPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createShipment } from "../../api/shipments";
import { listBranches } from "../../api/branches";
import { toast } from "react-toastify";

export default function CreateShipment() {
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [originBranch, setOriginBranch] = useState("");
  const [destinationBranch, setDestinationBranch] = useState("");
  const [weight, setWeight] = useState("");
  const [branches, setBranches] = useState([]);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadBranches();
  }, []);

  async function loadBranches() {
    try {
      const data = await listBranches();
      setBranches(data);
    } catch (err) {
      setError("Filiallarni yuklashda xatolik");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    try {
      const payload = {
        receiver_name: receiverName,
        receiver_phone: receiverPhone,
        origin_branch: originBranch ? Number(originBranch) : null,
        destination_branch: destinationBranch
          ? Number(destinationBranch)
          : null,
        weight: parseFloat(weight),
        // Agar kerak bo'lsa, qo'shimcha parametrlar: pickup_type, delivery_type, payment_responsibility
      };
      const res = await createShipment(payload);
      setMsg(
        `Yuk yaratildi! Tracking Code: ${res.tracking_code}, status: ${res.status}`
      );
      toast.success("Yuk muvaffaqiyatli yaratildi!", { autoClose: 2000 });
    } catch (err) {
      setError(err.response?.data?.detail || "Yuk yaratishda xatolik");
      toast.error(err.response?.data?.detail || "Yuk yaratishda xatolik", {
        autoClose: 2000,
      });
    }
  };

  return (
    <Container>
      <h2>Yangi Yuk Qo'shish</h2>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {msg && <SuccessMsg>{msg}</SuccessMsg>}
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Receiver Name"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Receiver Phone"
          value={receiverPhone}
          onChange={(e) => setReceiverPhone(e.target.value)}
        />
        <label>Origin Branch</label>
        <select
          value={originBranch}
          onChange={(e) => setOriginBranch(e.target.value)}
          required
        >
          <option value="">-- Tanlang --</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        <label>Destination Branch</label>
        <select
          value={destinationBranch}
          onChange={(e) => setDestinationBranch(e.target.value)}
        >
          <option value="">-- Tanlang --</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <button type="submit">Yaratish</button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  input,
  select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    padding: 0.75rem;
    border: none;
    border-radius: 5px;
    background-color: #f59023;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
      background-color: #e07c1e;
    }
  }
`;

const ErrorMsg = styled.div`
  background: #ffe3e3;
  color: #900;
  padding: 0.5rem;
  border-left: 3px solid #f00;
`;

const SuccessMsg = styled.div`
  background: #e3ffe7;
  color: #090;
  padding: 0.5rem;
  border-left: 3px solid #0f0;
`;
