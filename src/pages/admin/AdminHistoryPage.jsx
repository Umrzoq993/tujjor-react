// src/pages/admin/AdminHistoryPage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { listShipmentHistory } from "../../api/shipments"; // bu funksiya alohida yaratilishi kerak

export default function AdminHistoryPage() {
  const [histories, setHistories] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    loadData();
  }, [page]);

  async function loadData() {
    try {
      const data = await listShipmentHistory({ page });
      if (data.results) {
        setHistories(data.results);
        setCount(data.count);
      } else {
        setHistories(data);
        setCount(data.length);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <h2>Shipment History</h2>
      <ul>
        {histories.map((h) => (
          <li key={h.id}>
            {h.log_text} - {h.changed_at}
          </li>
        ))}
      </ul>
      <ReactPaginate
        pageCount={Math.ceil(count / pageSize)}
        onPageChange={({ selected }) => setPage(selected + 1)}
        // ...
      />
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
