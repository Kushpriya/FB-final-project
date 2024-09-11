// src/components/ClientAdd.jsx
import React, { useState, useEffect } from "react";
import "../../assets/css/Clients.css";

const ClientAdd = ({ addClient, editingClient, updateClient, onClose }) => {
  const [client, setClient] = useState({ name: "" });

  useEffect(() => {
    if (editingClient) {
      setClient(editingClient);
    }
  }, [editingClient]);

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingClient) {
      updateClient(client);
    } else {
      addClient(client);
    }
    onClose(); // Close form after submission
  };

  return (
    <div className="client-form-overlay">
      <div className="client-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{editingClient ? "Edit Client" : "Add Client"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <button type="submit">
            {editingClient ? "Update Client" : "Add Client"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientAdd;
