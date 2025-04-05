import React, { useState } from "react";
import { trackShipment } from "../api/shipments";

function TrackPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    try {
      const res = await trackShipment(code);
      setResult(res.detail); // text format
    } catch (err) {
      setResult("Xatolik yoki bunday kod topilmadi.");
    }
  };

  return (
    <div>
      <h2>Track Shipment</h2>
      <form onSubmit={handleTrack}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="T000000001"
        />
        <button type="submit">Track</button>
      </form>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>{result}</pre>
    </div>
  );
}

export default TrackPage;
