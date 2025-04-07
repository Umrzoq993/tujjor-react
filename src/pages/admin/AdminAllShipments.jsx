// src/pages/admin/AdminAllShipments.jsx
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  listShipments,
  createShipment,
  updateShipment,
  deleteShipment,
} from "../../api/shipments";

// react-js-dialog-box
import { ReactDialogBox } from "react-js-dialog-box";
import "react-js-dialog-box/dist/index.css";

// Add Shipment form
import AddShipmentDialog from "../../components/AddShipmentDialog";
// PDF view
import ShipmentPDFView from "../../components/ShipmentPDFView";

export default function AdminAllShipments() {
  // Data states
  const [shipments, setShipments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // UI states
  const [error, setError] = useState("");
  const [expandedRowId, setExpandedRowId] = useState(null);

  // Search & filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Dialog states (Add, Edit, Delete)
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Form state (Add/Edit)
  const [formData, setFormData] = useState({
    receiverName: "",
    receiverPhone: "",
    weight: "",
    pickupType: "office_dropoff",
    deliveryType: "office_pickup",
    paymentResp: "sender",
  });

  // Edit/Delete ID
  const [editShipmentId, setEditShipmentId] = useState(null);

  // PDF states
  const [pdfShipment, setPdfShipment] = useState(null);
  const pdfRef = useRef(null); // hidden container for PDF rendering

  useEffect(() => {
    loadData();
  }, [page, searchTerm, statusFilter]);

  async function loadData() {
    try {
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

  // Pagination
  function handlePageChange({ selected }) {
    setPage(selected + 1);
  }

  // Expand row
  function handleRowClick(id) {
    setExpandedRowId(expandedRowId === id ? null : id);
  }

  // Search & filter
  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
    setPage(1);
  }
  function handleStatusFilterChange(e) {
    setStatusFilter(e.target.value);
    setPage(1);
  }

  // ========== ADD SHIPMENT ==========
  function openAddDialog() {
    setFormData({
      receiverName: "",
      receiverPhone: "",
      weight: "",
      pickupType: "office_dropoff",
      deliveryType: "office_pickup",
      paymentResp: "sender",
    });
    setShowAddDialog(true);
  }
  async function handleAddShipment() {
    try {
      await createShipment({
        receiver_name: formData.receiverName,
        receiver_phone: formData.receiverPhone,
        weight: parseFloat(formData.weight),
        pickup_type: formData.pickupType,
        delivery_type: formData.deliveryType,
        payment_responsibility: formData.paymentResp,
      });
      setShowAddDialog(false);
      loadData();
    } catch (err) {
      console.error("Add shipment xato:", err);
    }
  }

  // ========== EDIT SHIPMENT ==========
  function openEditDialog(shipment) {
    setEditShipmentId(shipment.id);
    setFormData({
      receiverName: shipment.receiver_name,
      receiverPhone: shipment.receiver_phone || "",
      weight: shipment.weight,
      pickupType: shipment.pickup_type,
      deliveryType: shipment.delivery_type,
      paymentResp: shipment.payment_responsibility,
    });
    setShowEditDialog(true);
  }
  async function handleEditShipment() {
    try {
      await updateShipment(editShipmentId, {
        receiver_name: formData.receiverName,
        receiver_phone: formData.receiverPhone,
        weight: parseFloat(formData.weight),
        pickup_type: formData.pickupType,
        delivery_type: formData.deliveryType,
        payment_responsibility: formData.paymentResp,
      });
      setShowEditDialog(false);
      loadData();
    } catch (err) {
      console.error("Edit shipment xato:", err);
    }
  }

  // ========== DELETE SHIPMENT ==========
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
      console.error("Delete shipment xato:", err);
    }
  }

  // ========== PDF GENERATE ==========
  async function handleGeneratePdf(shipment) {
    setPdfShipment(shipment);
    // wait for render
    setTimeout(async () => {
      if (!pdfRef.current) return;
      const canvas = await html2canvas(pdfRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "p",
        unit: "px",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const htmlWidth = canvas.width;
      const htmlHeight = canvas.height;
      const ratio = htmlHeight / htmlWidth;
      const pdfHeight = pdfWidth * ratio;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`shipment_${shipment.tracking_code || "N/A"}.pdf`);
    }, 200);
  }

  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <Container>
      <h2>All Shipments (Admin)</h2>
      {error && <ErrorMsg>{error}</ErrorMsg>}

      <TopBar>
        <div>
          <label>Search: </label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Tracking code or receiver..."
          />
        </div>
        <div>
          <label>Status Filter: </label>
          <select value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="">--All--</option>
            <option value="client_created">client_created</option>
            <option value="approved">approved</option>
            <option value="in_transit">in_transit</option>
            {/* ... other statuses */}
          </select>
        </div>
        <button onClick={openAddDialog}>+ Add Shipment</button>
      </TopBar>

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
                        <button onClick={() => handleGeneratePdf(sh)}>
                          Generate PDF
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
                            <strong>Origin Branch:</strong>{" "}
                            {sh.origin_branch_name}
                          </p>
                          <p>
                            <strong>Destination Branch:</strong>{" "}
                            {sh.destination_branch_name}
                          </p>
                          <p>
                            <strong>Receiver Phone:</strong> {sh.receiver_phone}
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
                          <p>
                            <strong>Assigned Courier:</strong>{" "}
                            {sh.assigned_courier || "N/A"}
                          </p>
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

      {/* Add dialog */}
      {showAddDialog && (
        <DialogOverlay>
          <ReactDialogBox
            closeBox={() => setShowAddDialog(false)}
            modalWidth="450px"
            headerText="Add Shipment"
          >
            <AddShipmentDialog
              formData={formData}
              setFormData={setFormData}
              onSave={handleAddShipment}
              onCancel={() => setShowAddDialog(false)}
            />
          </ReactDialogBox>
        </DialogOverlay>
      )}

      {/* Edit dialog */}
      {showEditDialog && (
        <DialogOverlay>
          <ReactDialogBox
            closeBox={() => setShowEditDialog(false)}
            modalWidth="450px"
            headerText="Edit Shipment"
          >
            <AddShipmentDialog
              formData={formData}
              setFormData={setFormData}
              onSave={handleEditShipment}
              onCancel={() => setShowEditDialog(false)}
            />
          </ReactDialogBox>
        </DialogOverlay>
      )}

      {/* Delete dialog */}
      {showDeleteDialog && (
        <DialogOverlay>
          <ReactDialogBox
            closeBox={() => setShowDeleteDialog(false)}
            modalWidth="400px"
            headerText="Delete Shipment"
          >
            <DialogBody>
              <p>Are you sure you want to delete this shipment?</p>
            </DialogBody>
            <DialogFooter>
              <button onClick={handleDeleteShipment}>Yes, delete</button>
              <button onClick={() => setShowDeleteDialog(false)}>Cancel</button>
            </DialogFooter>
          </ReactDialogBox>
        </DialogOverlay>
      )}

      {/* Hidden PDF container */}
      <PdfHiddenContainer>
        {pdfShipment && (
          <div ref={pdfRef}>
            <ShipmentPDFView shipment={pdfShipment} />
          </div>
        )}
      </PdfHiddenContainer>
    </Container>
  );
}

// ========== Styled Components ==========

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
  align-items: center;
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
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
    z-index: 9999;
  }
`;

const DialogBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  label {
    font-weight: 500;
  }
  input,
  select {
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

const PdfHiddenContainer = styled.div`
  position: absolute;
  left: -9999px;
  top: -9999px;
`;
