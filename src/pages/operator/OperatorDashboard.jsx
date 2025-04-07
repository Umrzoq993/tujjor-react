// src/pages/operator/OperatorPage.jsx
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function OperatorDashboard() {
  return (
    <OperatorContainer>
      <h1>Operator Dashboard</h1>
      <p>Quyidagi amallarni bajaring:</p>
      <ul>
        <li>
          <Link to="/operator/approve">Approve Shipments</Link>
        </li>
        <li>
          <Link to="/operator/assign">Assign Courier</Link>
        </li>
      </ul>
    </OperatorContainer>
  );
}

const OperatorContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
`;
