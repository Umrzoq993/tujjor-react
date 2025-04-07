// src/pages/admin/AdminAllUsers.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { listUsers } from "../../api/auth";

export default function AdminAllUsers() {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const pageSize = 10;

  useEffect(() => {
    load();
  }, [page]);

  async function load() {
    try {
      const data = await listUsers({ page });
      if (data.results) {
        setUsers(data.results);
        setTotalCount(data.count);
      } else {
        // fallback
        setUsers(data);
        setTotalCount(data.length);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Xatolik");
    }
  }

  function handlePageChange({ selected }) {
    setPage(selected + 1);
  }

  return (
    <Container>
      <h2>All Users</h2>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <UserList>
        {users.map((u) => (
          <li key={u.id}>
            {u.username} - {u.role} - {u.is_active ? "Active" : "Inactive"}
          </li>
        ))}
      </UserList>
      <StyledPaginate
        pageCount={Math.ceil(totalCount / pageSize)}
        onPageChange={handlePageChange}
        forcePage={page - 1}
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
const ErrorMsg = styled.div`
  background: #ffe3e3;
  color: #900;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;
const UserList = styled.ul`
  list-style: none;
  padding: 0;
  li {
    background: #fff;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    padding: 0.5rem;
  }
`;
const StyledPaginate = styled(ReactPaginate)`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  list-style: none;
  li a {
    padding: 0.3rem 0.6rem;
    border: 1px solid #ccc;
    color: #333;
    text-decoration: none;
    cursor: pointer;
  }
  li.active a {
    background: #333;
    color: #fff;
    border: 1px solid #333;
  }
  li.disabled a {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
