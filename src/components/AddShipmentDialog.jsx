// src/components/AddShipmentDialog.jsx
import React from "react";
import styled from "styled-components";

function AddShipmentDialog({ formData, setFormData, onSave, onCancel }) {
  return (
    <DialogContent>
      <FormGroup>
        <Label>Receiver Name</Label>
        <Input
          type="text"
          value={formData.receiverName}
          onChange={(e) =>
            setFormData({ ...formData, receiverName: e.target.value })
          }
          placeholder="Enter receiver name"
        />
      </FormGroup>
      <FormGroup>
        <Label>Receiver Phone</Label>
        <Input
          type="text"
          value={formData.receiverPhone}
          onChange={(e) =>
            setFormData({ ...formData, receiverPhone: e.target.value })
          }
          placeholder="Enter receiver phone"
        />
      </FormGroup>
      <FormGroup>
        <Label>Weight (kg)</Label>
        <Input
          type="number"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          placeholder="Enter weight"
        />
      </FormGroup>
      <FormGroup>
        <Label>Pickup Type</Label>
        <Select
          value={formData.pickupType}
          onChange={(e) =>
            setFormData({ ...formData, pickupType: e.target.value })
          }
        >
          <option value="office_dropoff">Office Dropoff</option>
          <option value="courier_pickup">Courier Pickup</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Delivery Type</Label>
        <Select
          value={formData.deliveryType}
          onChange={(e) =>
            setFormData({ ...formData, deliveryType: e.target.value })
          }
        >
          <option value="office_pickup">Office Pickup</option>
          <option value="courier_delivery">Courier Delivery</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Payment Responsibility</Label>
        <Select
          value={formData.paymentResp}
          onChange={(e) =>
            setFormData({ ...formData, paymentResp: e.target.value })
          }
        >
          <option value="sender">Sender</option>
          <option value="receiver">Receiver</option>
        </Select>
      </FormGroup>
      <DialogActions>
        <DialogButton onClick={onSave}>Save</DialogButton>
        <DialogButton onClick={onCancel}>Cancel</DialogButton>
      </DialogActions>
    </DialogContent>
  );
}

export default AddShipmentDialog;

// Styled components for the dialog
const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const DialogButton = styled.button`
  padding: 0.4rem 0.8rem;
  border: none;
  background: #333;
  color: #fff;
  cursor: pointer;
  &:hover {
    background: #555;
  }
`;
