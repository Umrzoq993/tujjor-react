import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { listUsers } from "../../api/auth"; // API funksiya: usersni olish

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    loadUsers();
  }, [page]);

  async function loadUsers() {
    try {
      // Agar API ga page parametri yuborilsa
      const data = await listUsers({ page });
      // Javob paginatsiya obyektida "results" bo'lsa
      if (data.results) {
        setUsers(data.results);
        setTotalCount(data.count);
      } else {
        setUsers(data);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Xatolik yuz berdi");
    }
  }

  return (
    <Container>
      <h2>Manage Users</h2>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <UserList>
        {users.map((u) => (
          <li key={u.id}>
            {u.username} - {u.role} - is_active: {u.is_active ? "Yes" : "No"}
          </li>
        ))}
      </UserList>
      <Pagination>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {Math.ceil(totalCount / 10)}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={users.length < 10}>
          Next
        </button>
      </Pagination>
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

const ErrorMsg = styled.div`
  background: #ffe3e3;
  color: #900;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-left: 3px solid #f00;
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
  li {
    margin-bottom: 0.5rem;
    background: #fafafa;
    border: 1px solid #ccc;
    padding: 0.5rem;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  button {
    padding: 0.5rem 1rem;
    background-color: #333;
    color: #fff;
    border: none;
    cursor: pointer;
    &:disabled {
      background-color: #888;
      cursor: not-allowed;
    }
  }
  span {
    font-size: 1rem;
    color: #333;
  }
`;
