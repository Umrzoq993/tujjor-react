// src/routes/AppRouter.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPhysicalPage from "../pages/auth/RegisterPhysicalPage";
import VerifyPhonePage from "../pages/auth/VerifyPhonePage";

import MyShipments from "../pages/user/MyShipments";
import CreateShipment from "../pages/user/CreateShipment";

import OperatorDashboard from "../pages/operator/OperatorDashboard";
import ApproveShipmentsPage from "../pages/operator/ApproveShipments";
import AssignCourierPage from "../pages/operator/AssignCourierPage";

import CourierDashboard from "../pages/courier/CourierDashboard";

import PrivateRoute from "../components/PrivateRoute";
import RoleRoute from "../components/RoleRoute";
import AdminAllShipments from "../pages/admin/AdminAllShipments";
import AdminAllUsers from "../pages/admin/AdminAllUsers";
import AdminHistoryPage from "../pages/admin/AdminHistoryPage";
import AdminLayout from "../layouts/AdminLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-physical" element={<RegisterPhysicalPage />} />
        <Route path="/verify-phone" element={<VerifyPhonePage />} />

        {/* User routes (physical/legal) */}
        <Route
          path="/user/my-shipments"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["physical", "legal"]}>
                <MyShipments />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/user/create-shipment"
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
                <OperatorDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/operator/approve"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["operator", "admin"]}>
                <ApproveShipmentsPage />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/operator/assign"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["operator", "admin"]}>
                <AssignCourierPage />
              </RoleRoute>
            </PrivateRoute>
          }
        />

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

        {/* Admin route with AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="shipments" element={<AdminAllShipments />} />
          <Route path="users" element={<AdminAllUsers />} />
          <Route path="history" element={<AdminHistoryPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
