// src/components/ShipmentLabel.jsx
import React from "react";
import styled from "styled-components";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";

export default function ShipmentLabel({ shipment }) {
  // Agar shipment.tracking_code mavjud bo'lmasa, "N/A" deb ko'rsatamiz
  const trackCode = shipment.tracking_code || "N/A";

  return (
    <LabelContainer>
      <Header>
        <LocationInfo>
          <LocationLine>{shipment.origin_branch_name}</LocationLine>
        </LocationInfo>
        <Logo src="/assets/tujjor_logo.png" alt="Tujjor Express" />
      </Header>

      <TrackingArea>
        <TrackingLabel>{trackCode}</TrackingLabel>
      </TrackingArea>

      <InfoSection>
        <SectionTitle>Receiver</SectionTitle>
        <InfoRow>
          <strong>Name:</strong> {shipment.receiver_name}
        </InfoRow>
        <InfoRow>
          <strong>Phone:</strong> {shipment.receiver_phone}
        </InfoRow>
      </InfoSection>

      <InfoSection>
        <SectionTitle>Sender</SectionTitle>
        <InfoRow>
          <strong>Name:</strong> {shipment.sender_name}
        </InfoRow>
        {/* Agar qo'shimcha sender ma'lumotlari kerak bo'lsa, ularni ham qo'shish mumkin */}
      </InfoSection>

      <InfoSection>
        <InfoRow>
          <strong>Origin Branch:</strong> {shipment.origin_branch_name}
        </InfoRow>
        <InfoRow>
          <strong>Destination Branch:</strong>{" "}
          {shipment.destination_branch_name}
        </InfoRow>
      </InfoSection>

      <InfoSection>
        <InfoRow>
          <strong>Weight:</strong> {shipment.weight} kg
        </InfoRow>
        <InfoRow>
          <strong>Price:</strong> {shipment.price ? shipment.price : "N/A"}
        </InfoRow>
        <InfoRow>
          <strong>Pickup Type:</strong> {shipment.pickup_type}
        </InfoRow>
        <InfoRow>
          <strong>Delivery Type:</strong> {shipment.delivery_type}
        </InfoRow>
        <InfoRow>
          <strong>Payment Resp.:</strong> {shipment.payment_responsibility}
        </InfoRow>
        <InfoRow>
          <strong>Assigned Courier:</strong>{" "}
          {shipment.assigned_courier || "N/A"}
        </InfoRow>
      </InfoSection>

      <CodesRow>
        <Barcode
          value={trackCode}
          format="CODE128"
          width={1.5}
          height={60}
          displayValue={false}
        />
        <QRCode value={trackCode} size={70} />
      </CodesRow>
    </LabelContainer>
  );
}

// Styled-components

const LabelContainer = styled.div`
  width: 380px; /* PDFda tushadigan kenglik */
  padding: 1rem;
  background: #fff;
  color: #000;
  font-family: "Arial", sans-serif;
  border: 1px solid #000;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LocationInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const LocationLine = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Logo = styled.img`
  width: 80px;
  height: auto;
  object-fit: contain;
`;

const TrackingArea = styled.div`
  position: absolute;
  right: -20px;
  top: 100px;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  font-weight: bold;
  font-size: 0.8rem;
  color: #333;
`;

const InfoSection = styled.div`
  margin-top: 0.5rem;
`;

const SectionTitle = styled.h3`
  margin: 1rem 0 0.3rem 0;
  text-decoration: underline;
  font-size: 1rem;
`;

const InfoRow = styled.div`
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
`;

const CodesRow = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TrackingLabel = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
`;
