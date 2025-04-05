// src/pages/operator/OperatorDashboard.jsx
import React, { useEffect } from "react";

function OperatorDashboard() {
  useEffect(() => {
    // ws://localhost:8000/ws/shipments/
    const wsScheme = window.location.protocol === "https:" ? "wss" : "ws";
    const socket = new WebSocket(
      `${wsScheme}://${window.location.host}/ws/shipments/`
    );

    socket.onopen = () => {
      console.log("WS connected");
    };
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      // data: {shipment_id, old_status, new_status,...}
      alert(
        `Real-time: Shipment #${data.shipment_id} changed from ${data.old_status} to ${data.new_status}`
      );
      // Yoki toast, Redux store update, etc.
    };

    return () => socket.close();
  }, []);

  return (
    <div>
      <h2>Operator Dashboard</h2>
      <p>Real-time updates will appear as alerts</p>
    </div>
  );
}

export default OperatorDashboard;
