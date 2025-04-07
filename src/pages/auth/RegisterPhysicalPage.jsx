// src/pages/auth/RegisterPhysicalPage.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { registerPhysical } from "../../api/auth";

export default function RegisterPhysicalPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    try {
      await registerPhysical({ username, password, phone_number: phone });
      setMsg("Ro‘yxatdan o‘tildi! SMS code bilan tasdiqlang.");
    } catch (err) {
      setError(err.response?.data?.detail || "Xatolik yuz berdi");
    }
  };

  return (
    <Container>
      <h2>Register (Physical)</h2>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {msg && <SuccessMsg>{msg}</SuccessMsg>}
      <Form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Parol"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          placeholder="Telefon raqami (+998...)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
`;
const ErrorMsg = styled.div`
  background: #ffe3e3;
  color: #900;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;
const SuccessMsg = styled.div`
  background: #e3ffe7;
  color: #090;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
  }
  button {
    background: #333;
    color: #fff;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
  }
`;
