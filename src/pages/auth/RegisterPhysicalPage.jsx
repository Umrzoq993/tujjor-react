// src/pages/auth/RegisterPhysicalPage.jsx

import React, { useState } from "react";
import axios from "axios";

// Material UI importlari
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

const API_URL = "http://127.0.0.1:8000";

function RegisterPhysicalPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      // Foydalanuvchi ma’lumotlari
      const payload = {
        username,
        password,
        phone_number: phoneNumber,
      };

      // `POST /api/accounts/register/`
      const res = await axios.post(
        `${API_URL}/api/accounts/register/`,
        payload
      );
      setSuccess(
        "Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz! Endi SMS code orqali tasdiqlang."
      );
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "Ro‘yxatdan o‘tishda xatolik");
      } else {
        setError("Tarmoq yoki server xatoligi yuz berdi");
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ro'yxatdan o'tish (Jismoniy shaxs)
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <TextField
          label="Parol"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <TextField
          label="Telefon raqami"
          type="tel"
          placeholder="+998901234567"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        <Button variant="contained" color="primary" type="submit">
          Ro'yxatdan o'tish
        </Button>
      </Box>
    </Container>
  );
}

export default RegisterPhysicalPage;
