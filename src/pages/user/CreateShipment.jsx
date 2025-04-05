import React, { useState, useEffect } from "react";
import { createShipment } from "../../api/shipments";
import { getBranches } from "../../api/branches";

function CreateShipment() {
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [originBranch, setOriginBranch] = useState("");
  const [destinationBranch, setDestinationBranch] = useState("");
  const [weight, setWeight] = useState("");
  const [msg, setMsg] = useState("");
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    loadBranches();
  }, []);

  async function loadBranches() {
    try {
      const data = await getBranches();
      setBranches(data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const newShipment = {
        receiver_name: receiverName,
        receiver_phone: receiverPhone,
        origin_branch: originBranch ? Number(originBranch) : null,
        destination_branch: destinationBranch
          ? Number(destinationBranch)
          : null,
        weight: parseFloat(weight),
      };
      const res = await createShipment(newShipment);
      setMsg(
        `Yuk yaratildi: tracking_code = ${res.tracking_code}, status=${res.status}`
      );
    } catch (err) {
      setMsg("Xatolik: " + err.response?.data?.detail);
    }
  };

  return (
    <div>
      <h2>Create Shipment</h2>
      <p>{msg}</p>
      <form onSubmit={handleCreate}>
        <label>Receiver Name</label>
        <br />
        <input
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
          required
        />
        <br />

        <label>Receiver Phone</label>
        <br />
        <input
          value={receiverPhone}
          onChange={(e) => setReceiverPhone(e.target.value)}
        />
        <br />

        <label>Origin Branch</label>
        <br />
        <select
          value={originBranch}
          onChange={(e) => setOriginBranch(e.target.value)}
          required
        >
          <option value="">-- Select Branch --</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        <br />

        <label>Destination Branch</label>
        <br />
        <select
          value={destinationBranch}
          onChange={(e) => setDestinationBranch(e.target.value)}
        >
          <option value="">-- Select Branch --</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        <br />

        <label>Weight (kg)</label>
        <br />
        <input
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateShipment;
