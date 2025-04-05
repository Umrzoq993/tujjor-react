import React, { useEffect, useState } from "react";
import { listShipments } from "../../api/shipments";

function ApproveShipments() {
  const [pending, setPending] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, [page, search]);

  async function loadData() {
    try {
      const data = await listShipments({
        page,
        status: "client_created",
        search,
      });
      setPending(data.results || data); // agar DRF pagination
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h3>Shipments to Approve</h3>
      <div>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ul>
        {pending.map((p) => (
          <li key={p.id}>
            {p.tracking_code} - {p.receiver_name}
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

export default ApproveShipments;
