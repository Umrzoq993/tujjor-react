// src/layouts/AdminLayout.jsx
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import styled from "styled-components";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUserRole } from "../api/auth";
// lucide-react ikonkalari
import { Truck, Users, History, BookOpen, Calendar } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const role = getUserRole();

  // Agar foydalanuvchi admin bo'lmasa, unauthorized sahifaga yo'naltiramiz
  React.useEffect(() => {
    if (role !== "admin") {
      navigate("/unauthorized");
    }
  }, [role, navigate]);

  // Sidebar collapsed holatini boshqarish (default qisqa)
  const [collapsed, setCollapsed] = React.useState(true);

  return (
    <LayoutContainer>
      <SidebarWrapper
        collapsed={collapsed} // Bu yerda collapsed prop-ni uzatamiz!
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        <Sidebar collapsed={collapsed}>
          <Menu iconShape="square">
            <MenuItem
              icon={<Truck size={18} />}
              component={<Link to="/admin/shipments" />}
            >
              All Shipments
            </MenuItem>
            <MenuItem
              icon={<Users size={18} />}
              component={<Link to="/admin/users" />}
            >
              All Users
            </MenuItem>
            <SubMenu label="Shipment History" icon={<History size={18} />}>
              <MenuItem component={<Link to="/admin/history" />}>
                View History
              </MenuItem>
            </SubMenu>
            <MenuItem
              icon={<BookOpen size={18} />}
              component={<Link to="/admin/documentation" />}
            >
              Documentation
            </MenuItem>
            <MenuItem
              icon={<Calendar size={18} />}
              component={<Link to="/admin/calendar" />}
            >
              Calendar
            </MenuItem>
          </Menu>
        </Sidebar>
      </SidebarWrapper>
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
}

// Styled-components

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const SidebarWrapper = styled.div`
  width: ${(props) => (props.collapsed ? "80px" : "250px")};
  transition: width 0.3s ease;
  .pro-sidebar {
    background-color: #fff !important;
    border-right: 1px solid #ccc;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 1rem;
  background: #f1f1f1;
  overflow-y: auto;
`;
