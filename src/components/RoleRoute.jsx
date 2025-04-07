// src/components/RoleRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../api/auth";

export default function RoleRoute({ allowedRoles, children }) {
  const role = getUserRole();
  if (!role) return <Navigate to="/login" />;
  if (allowedRoles.includes(role)) {
    return children;
  } else {
    return <Navigate to="/unauthorized" />;
  }
}
