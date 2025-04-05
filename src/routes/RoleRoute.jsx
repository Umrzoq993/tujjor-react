import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../api/auth";

const RoleRoute = ({ allowedRoles, children }) => {
  const role = getUserRole(); // decode from token or store
  if (!role) return <Navigate to="/login" />;

  if (allowedRoles.includes(role)) {
    return children;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default RoleRoute;
