// OperatorLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

function OperatorLayout() {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "200px", borderRight: "1px solid #ccc" }}>
        <h3>Operator Menu</h3>
        <ul>
          <li>
            <Link to="/operator/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/operator/approve">Approve Shipments</Link>
          </li>
        </ul>
      </aside>
      <main style={{ margin: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default OperatorLayout;
