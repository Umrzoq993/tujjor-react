// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { getUserRole, logout } from "../api/auth";

function Navbar() {
  const role = getUserRole();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav>
      <Link to="/">Home</Link>{" "}
      {role === "physical" && <Link to="/user">My Shipments</Link>}
      {role === "physical" && <Link to="/user/create">Create Shipment</Link>}
      {role === "operator" && <Link to="/operator">Operator Dashboard</Link>}
      {role === "courier" && <Link to="/courier">Courier Dashboard</Link>}
      {role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
      {!role && <Link to="/login">Login</Link>}
      {!role && <Link to="/register">Register</Link>}
      <Link to="/track">Track</Link>
      {role && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;
