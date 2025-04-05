import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await axios.post(`${API_URL}/api/accounts/register/`, {
        username,
        password,
        phone_number: phone,
      });
      setMsg("Ro‘yxatdan o‘tildi! Endi SMS code bilan tasdiqlang.");
    } catch (err) {
      setMsg("Xatolik: " + err.response?.data?.detail);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <p>{msg}</p>
      <form onSubmit={handleRegister}>
        <label>Username</label>
        <br />
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label>Phone</label>
        <br />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
