// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../api/auth";

export default function PrivateRoute({ children }) {
  const token = getAccessToken();
  return token ? children : <Navigate to="/login" />;
}
