// src/pages/auth/VerifyPhonePage.jsx

import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

const API_URL = "http://127.0.0.1:8000";

function VerifyPhonePage() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const payload = { username, code };
      const res = await axios.post(
        `${API_URL}/api/accounts/verify-phone/`,
        payload
      );
      setSuccess("Telefon tasdiqlandi. Endi login qilishingiz mumkin!");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "Kod tasdiqlashda xatolik");
      } else {
        setError("Tarmoq yoki server xatoligi");
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Telefon tasdiqlash
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
          label="SMS Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <Button variant="contained" color="primary" type="submit">
          Tasdiqlash
        </Button>
      </Box>
    </Container>
  );
}

export default VerifyPhonePage;
