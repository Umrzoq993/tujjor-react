import React, { useEffect, useState } from "react";
import { listShipments, changeStatus } from "../../api/shipments";

function CourierDashboard() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      // backendda "courier" roli => faqat assigned_courier=this user bo‘lgan shipment larni qaytaradi
      const data = await listShipments();
      setShipments(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleChangeStatus(id, newStatus) {
    try {
      await changeStatus(id, newStatus);
      loadData();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Courier Dashboard</h2>
      <ul>
        {shipments.map((sh) => (
          <li key={sh.id}>
            {sh.tracking_code} - {sh.receiver_name}, status={sh.status}
            {sh.status === "in_transit" && (
              <button onClick={() => handleChangeStatus(sh.id, "arrived")}>
                Mark as Arrived
              </button>
            )}
            {sh.status === "arrived" && (
              <button onClick={() => handleChangeStatus(sh.id, "delivered")}>
                Deliver
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourierDashboard;
