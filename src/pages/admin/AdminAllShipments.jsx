// src/pages/admin/AdminAllShipments.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import {
  listShipments,
  createShipment,
  updateShipment,
  deleteShipment,
} from "../../api/shipments";
import { ReactDialogBox } from "react-js-dialog-box";
import "react-js-dialog-box/dist/index.css"; // react-js-dialog-box style

export default function AdminAllShipments() {
  // Data states
  const [shipments, setShipments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // UI states
  const [error, setError] = useState("");
  const [expandedRowId, setExpandedRowId] = useState(null);

  // Search, filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Dialog states
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Form states for add/edit
  const [formTrackingCode, setFormTrackingCode] = useState("");
  const [formReceiverName, setFormReceiverName] = useState("");
  const [editShipmentId, setEditShipmentId] = useState(null);

  useEffect(() => {
    loadData();
  }, [page, searchTerm, statusFilter]);

  async function loadData() {
    try {
      // Parametrlar: page, search, status
      const params = {
        page,
        search: searchTerm || undefined,
        status: statusFilter || undefined,
      };
      const data = await listShipments(params);
      if (data.results) {
        setShipments(data.results);
        setTotalCount(data.count);
      } else {
        setShipments(data);
        setTotalCount(data.length);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Xatolik");
    }
  }

  // react-paginate
  function handlePageChange({ selected }) {
    setPage(selected + 1);
  }

  // expand row
  function handleRowClick(id) {
    setExpandedRowId(expandedRowId === id ? null : id);
  }

  // search
  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
    setPage(1);
  }

  // filter
  function handleStatusFilterChange(e) {
    setStatusFilter(e.target.value);
    setPage(1);
  }

  // ============ ADD SHIPMENT ============
  function openAddDialog() {
    setFormTrackingCode("");
    setFormReceiverName("");
    setShowAddDialog(true);
  }
  async function handleAddShipment() {
    try {
      // minimal misol
      await createShipment({
        tracking_code: formTrackingCode,
        receiver_name: formReceiverName,
        weight: 1.5, // misol
        // ...boshqa zarur maydonlar
      });
      setShowAddDialog(false);
      loadData();
    } catch (err) {
      console.error("Add shipment xato", err);
    }
  }

  // ============ EDIT SHIPMENT ============
  function openEditDialog(shipment) {
    setEditShipmentId(shipment.id);
    setFormTrackingCode(shipment.tracking_code);
    setFormReceiverName(shipment.receiver_name);
    setShowEditDialog(true);
  }
  async function handleEditShipment() {
    try {
      await updateShipment(editShipmentId, {
        tracking_code: formTrackingCode,
        receiver_name: formReceiverName,
        // ...
      });
      setShowEditDialog(false);
      loadData();
    } catch (err) {
      console.error("Edit shipment xato", err);
    }
  }

  // ============ DELETE SHIPMENT ============
  function openDeleteDialog(shipment) {
    setEditShipmentId(shipment.id);
    setShowDeleteDialog(true);
  }
  async function handleDeleteShipment() {
    try {
      await deleteShipment(editShipmentId);
      setShowDeleteDialog(false);
      loadData();
    } catch (err) {
      console.error("Delete xato", err);
    }
  }

  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <Container>
      <h2>All Shipments (Admin)</h2>
      {error && <ErrorMsg>{error}</ErrorMsg>}

      {/* SEARCH & FILTER & ADD */}
      <TopBar>
        <div>
          <label>Search: </label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by tracking code or receiver..."
          />
        </div>
        <div>
          <label>Status Filter: </label>
          <select value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="">--All--</option>
            <option value="client_created">client_created</option>
            <option value="approved">approved</option>
            <option value="in_transit">in_transit</option>
            {/* ... Boshqa statuslar */}
          </select>
        </div>
        <button onClick={openAddDialog}>+ Add Shipment</button>
      </TopBar>

      {/* JADVAL */}
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>Tracking</th>
              <th>Receiver</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((sh) => {
              const isExpanded = expandedRowId === sh.id;
              return (
                <React.Fragment key={sh.id}>
                  <tr onClick={() => handleRowClick(sh.id)}>
                    <td>{sh.tracking_code}</td>
                    <td>{sh.receiver_name}</td>
                    <td>{sh.status}</td>
                    <td>
                      <ActionButtons onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => openEditDialog(sh)}>Edit</button>
                        <button onClick={() => openDeleteDialog(sh)}>
                          Delete
                        </button>
                      </ActionButtons>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="expand-row">
                      <td colSpan={4}>
                        <ExpandedContent>
                          <p>
                            <strong>Sender:</strong> {sh.sender_name}
                          </p>
                          <p>
                            <strong>Origin branch:</strong>{" "}
                            {sh.origin_branch_name}
                          </p>
                          <p>
                            <strong>Destination:</strong>{" "}
                            {sh.destination_branch_name}
                          </p>
                          <p>
                            <strong>Weight:</strong> {sh.weight}
                          </p>
                          <p>
                            <strong>Price:</strong> {sh.price}
                          </p>
                          <p>
                            <strong>Pickup Type:</strong> {sh.pickup_type}
                          </p>
                          <p>
                            <strong>Delivery Type:</strong> {sh.delivery_type}
                          </p>
                          <p>
                            <strong>Payment Resp.:</strong>{" "}
                            {sh.payment_responsibility}
                          </p>
                          {/* ... Boshqa ma'lumotlar */}
                        </ExpandedContent>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </TableWrapper>

      {/* PAGINATION */}
      {pageCount > 1 && (
        <StyledPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          forcePage={page - 1}
        />
      )}

      {/* ADD DIALOG */}
      {showAddDialog && (
        <DialogOverlay>
          <ReactDialogBox
            closeBox={() => setShowAddDialog(false)}
            // react-js-dialog-box props
            modalWidth="450px"
            headerText="Add Shipment"
            bodyElement={
              <DialogBody>
                <label>Tracking Code</label>
                <input
                  type="text"
                  value={formTrackingCode}
                  onChange={(e) => setFormTrackingCode(e.target.value)}
                />
                <label>Receiver Name</label>
                <input
                  type="text"
                  value={formReceiverName}
                  onChange={(e) => setFormReceiverName(e.target.value)}
                />
                {/* ... boshqa maydonlar agar kerak bo'lsa */}
              </DialogBody>
            }
            footerElement={
              <DialogFooter>
                <button onClick={handleAddShipment}>Save</button>
                <button onClick={() => setShowAddDialog(false)}>Cancel</button>
              </DialogFooter>
            }
          />
        </DialogOverlay>
      )}

      {/* EDIT DIALOG */}
      {showEditDialog && (
        <DialogOverlay>
          <ReactDialogBox
            closeBox={() => setShowEditDialog(false)}
            modalWidth="450px"
            headerText="Edit Shipment"
            bodyElement={
              <DialogBody>
                <label>Tracking Code</label>
                <input
                  type="text"
                  value={formTrackingCode}
                  onChange={(e) => setFormTrackingCode(e.target.value)}
                />
                <label>Receiver Name</label>
                <input
                  type="text"
                  value={formReceiverName}
                  onChange={(e) => setFormReceiverName(e.target.value)}
                />
                {/* ... */}
              </DialogBody>
            }
            footerElement={
              <DialogFooter>
                <button onClick={handleEditShipment}>Save</button>
                <button onClick={() => setShowEditDialog(false)}>Cancel</button>
              </DialogFooter>
            }
          />
        </DialogOverlay>
      )}

      {/* DELETE confirm DIALOG */}
      {showDeleteDialog && (
        <DialogOverlay>
          <ReactDialogBox
            closeBox={() => setShowDeleteDialog(false)}
            modalWidth="400px"
            headerText="Delete Shipment"
            bodyElement={
              <DialogBody>
                <p>Are you sure you want to delete this shipment?</p>
              </DialogBody>
            }
            footerElement={
              <DialogFooter>
                <button onClick={handleDeleteShipment}>Yes, delete</button>
                <button onClick={() => setShowDeleteDialog(false)}>
                  Cancel
                </button>
              </DialogFooter>
            }
          />
        </DialogOverlay>
      )}
    </Container>
  );
}

// ========== Styled components ==========

const Container = styled.div`
  padding: 1rem;
`;

const ErrorMsg = styled.div`
  background: #ffe3e3;
  color: #900;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid #f00;
`;

const TopBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  button {
    background: #333;
    color: #fff;
    border: none;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
  }
  input,
  select {
    padding: 0.3rem;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  table {
    width: 100%;
    border-collapse: collapse;
    thead {
      background: #f5f5f5;
    }
    th,
    td {
      border: 1px solid #ccc;
      padding: 0.5rem;
    }
    tbody tr {
      cursor: pointer;
      &:hover {
        background: #fafafa;
      }
    }
    tr.expand-row {
      background: #fffbdc;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  button {
    background: #555;
    color: #fff;
    border: none;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    &:hover {
      background: #777;
    }
  }
`;

const ExpandedContent = styled.div`
  padding: 0.5rem;
  p {
    margin: 0.3rem 0;
  }
`;

const StyledPaginate = styled(ReactPaginate)`
  display: flex;
  gap: 0.5rem;
  list-style: none;
  margin-top: 1rem;

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

// react-js-dialog-box style
const DialogOverlay = styled.div`
  .dialogboxOverlay {
    z-index: 9999; /* modal ustun turishi uchun */
  }
`;

const DialogBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  label {
    font-weight: 500;
  }
  input {
    padding: 0.4rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  button {
    padding: 0.4rem 0.8rem;
    border: none;
    cursor: pointer;
    background: #333;
    color: #fff;
    &:hover {
      background: #555;
    }
  }
`;
