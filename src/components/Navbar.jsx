// Misol: Navbar.jsx
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getUserRole, logout } from "../api/auth";

export default function Navbar() {
  const role = getUserRole(); // agar foydalanuvchi login qilgan bo'lsa, token orqali ro'l aniqlanadi

  return (
    <NavBar>
      <div className="logo">Tujjor Express</div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/track">Track</Link>
        {!role && <Link to="/register-physical">Register</Link>}
        {!role && <Link to="/login">Login</Link>}
        {role === "admin" && <Link to="/admin">Admin</Link>}
        {role === "operator" && <Link to="/operator">Operator</Link>}
        {role === "courier" && <Link to="/courier">Courier</Link>}
        {(role === "physical" || role === "legal") && (
          <Link to="/user/my-shipments">My Shipments</Link>
        )}
        {role && <button onClick={logout}>Logout</button>}
      </div>
    </NavBar>
  );
}

const NavBar = styled.div`
  background: #fafafa;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    font-weight: bold;
    font-size: 1.5rem;
  }
  .links {
    a {
      margin-right: 1rem;
      text-decoration: none;
      color: #333;
    }
    button {
      background: #333;
      color: #fff;
      border: none;
      padding: 0.4rem 0.8rem;
      cursor: pointer;
    }
  }
`;
