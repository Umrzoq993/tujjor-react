import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import TrackPage from "../pages/TrackPage";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

import MyShipments from "../pages/user/MyShipments";
import CreateShipment from "../pages/user/CreateShipment";
import OperatorDashboard from "../pages/operator/OperatorDashboard";
import ApproveShipments from "../pages/operator/ApproveShipments";
import CourierDashboard from "../pages/courier/CourierDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import OperatorLayout from "../pages/operator/OperatorLayout";
import RegisterPhysicalPage from "../pages/auth/RegisterPhysicalPage";
import VerifyPhonePage from "../pages/auth/VerifyPhonePage";
import LandingPage from "../pages/LandingPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/track" element={<TrackPage />} />
        <Route path="/register-physical" element={<RegisterPhysicalPage />} />
        <Route path="/verify-phone" element={<VerifyPhonePage />} />

        <Route path="/unauthorized" element={<h2>Unauthorized</h2>} />

        {/* User routes (physical/legal) */}
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["physical", "legal"]}>
                <MyShipments />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/user/create"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["physical", "legal"]}>
                <CreateShipment />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Operator routes */}
        <Route
          path="/operator"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["operator", "admin"]}>
                <OperatorLayout />
              </RoleRoute>
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<OperatorDashboard />} />
          <Route path="approve" element={<ApproveShipments />} />
        </Route>

        {/* Courier routes */}
        <Route
          path="/courier"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["courier"]}>
                <CourierDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<h2>Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
