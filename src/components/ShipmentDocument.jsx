// src/components/ShipmentDocument.jsx
import React from "react";
import styled from "styled-components";

export default function ShipmentDocument({ shipment }) {
  return (
    <DocumentContainer>
      <Section>
        <Title>Shipment Document</Title>
        <DetailRow>
          <strong>Tracking Code:</strong>
          <span>{shipment.tracking_code}</span>
        </DetailRow>
      </Section>
      <Section>
        <Title>Receiver Details</Title>
        <DetailRow>
          <strong>FISH:</strong>
          <span>{shipment.receiver_name}</span>
        </DetailRow>
        <DetailRow>
          <strong>Telefon:</strong>
          <span>{shipment.receiver_phone || "N/A"}</span>
        </DetailRow>
      </Section>
      <Section>
        <Title>Sender Details</Title>
        <DetailRow>
          <strong>FISH:</strong>
          <span>{shipment.sender_name}</span>
        </DetailRow>
        {/* Agar sender_phone mavjud bo‘lsa */}
        {shipment.sender_phone && (
          <DetailRow>
            <strong>Telefon:</strong>
            <span>{shipment.sender_phone}</span>
          </DetailRow>
        )}
      </Section>
      <Section>
        <DetailRow>
          <strong>Origin Branch:</strong>
          <span>{shipment.origin_branch_name}</span>
        </DetailRow>
        <DetailRow>
          <strong>Destination Branch:</strong>
          <span>{shipment.destination_branch_name}</span>
        </DetailRow>
      </Section>
      <Section>
        <DetailRow>
          <strong>Weight:</strong>
          <span>{shipment.weight} kg</span>
        </DetailRow>
        <DetailRow>
          <strong>Price:</strong>
          <span>{shipment.price || "N/A"}</span>
        </DetailRow>
        <DetailRow>
          <strong>Pickup Type:</strong>
          <span>{shipment.pickup_type}</span>
        </DetailRow>
        <DetailRow>
          <strong>Delivery Type:</strong>
          <span>{shipment.delivery_type}</span>
        </DetailRow>
        <DetailRow>
          <strong>Payment Resp.:</strong>
          <span>{shipment.payment_responsibility}</span>
        </DetailRow>
        <DetailRow>
          <strong>Assigned Courier:</strong>
          <span>{shipment.assigned_courier || "N/A"}</span>
        </DetailRow>
      </Section>
      {/* Agar boshqa maydonlar bo‘lsa, qo‘shing */}
    </DocumentContainer>
  );
}

const DocumentContainer = styled.div`
  padding: 1rem;
  font-family: "Roboto", sans-serif;
  color: #333;
`;

const Section = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  text-decoration: underline;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;
`;
