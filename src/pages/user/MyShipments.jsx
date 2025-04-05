import React, { useEffect, useState } from "react";
import { listShipments } from "../../api/shipments";

function MyShipments() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await listShipments();
      // backendda role bo‘yicha filter, user faqat o‘z yuklarini ko‘radi
      setShipments(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>My Shipments</h2>
      <ul>
        {shipments.map((sh) => (
          <li key={sh.id}>
            Tracking: {sh.tracking_code}, Status: {sh.status}, Price: {sh.price}
            , Created: {sh.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyShipments;
