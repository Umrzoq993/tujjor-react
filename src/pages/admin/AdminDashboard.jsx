// src/layouts/AdminLayout.jsx
import React from "react";
import styled from "styled-components";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
// react-pro-sidebar default style
import "react-pro-sidebar/dist/css/styles.css";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { getUserRole } from "../api/auth";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const role = getUserRole();

  // Agar role!='admin' bo'lsa, majburiy ravishda chetga
  React.useEffect(() => {
    if (role !== "admin") {
      navigate("/unauthorized");
    }
  }, [role, navigate]);

  return (
    <Container>
      <SideBarWrapper>
        <ProSidebar>
          <SidebarHeader>
            <HeaderText>Admin Panel</HeaderText>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem>
                All Shipments
                <Link to="/admin/shipments" />
              </MenuItem>
              <MenuItem>
                All Users
                <Link to="/admin/users" />
              </MenuItem>
              <MenuItem>
                Shipment History
                <Link to="/admin/history" />
              </MenuItem>
              {/* Boshqa itemlar ham bo‘lishi mumkin */}
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </SideBarWrapper>

      <MainContent>
        <Outlet />
      </MainContent>
    </Container>
  );
}

// ========== Styled components ==========
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const SideBarWrapper = styled.div`
  /* Sidebar width auto bo'ladi, ProSidebar o'zi manage */
`;

const MainContent = styled.div`
  flex: 1;
  background: #f1f1f1;
  padding: 1rem;
  overflow-y: auto;
`;

const HeaderText = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 0;
`;
