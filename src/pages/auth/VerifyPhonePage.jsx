// src/pages/auth/VerifyPhonePage.jsx
import React, { useState } from "react";
import axios from "axios";

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
      await axios.post(`${API_URL}/api/accounts/verify-phone/`, {
        username,
        code,
      });
      setSuccess("Telefon tasdiqlandi. Endi login qilishingiz mumkin!");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "Kod xato");
      } else {
        setError("Tarmoq yoki server xatolik");
      }
    }
  };

  return (
    <div className="container">
      <h2>SMS Kod Tasdiqlash</h2>
      {error && <div className="message-error">{error}</div>}
      {success && <div className="message-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="minimal-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="minimal-input"
          placeholder="SMS Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="minimal-button" type="submit">
          Tasdiqlash
        </button>
      </form>
    </div>
  );
}

export default VerifyPhonePage;
