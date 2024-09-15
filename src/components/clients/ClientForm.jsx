import React, { useState, useEffect } from "react";
import "../../assets/css/Clients.css";

export default function ClientForm({ handleCreate, handleEdit, selectedClient, setSelectedClient, toggleFormVisibility }) {
  const [client, setClient] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    createdAt: '',
    updatedAt: '',
  });

  useEffect(() => {
    console.log("Selected Client in ClientAdd:", selectedClient);
    if (selectedClient) {
      setClient(selectedClient);
    }
  }, [selectedClient]);

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedClient) {
      handleEdit(client);
    } else {
      handleCreate(client);
    }
    toggleFormVisibility(); // Ensure form is hidden after submission
  };

  return (
    <div className="client-form-overlay">
      <div className="client-form-container">
        <button className="close-button" onClick={toggleFormVisibility}>X</button>
        <h2>{selectedClient ? "Edit Client" : "Add Client"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input 
              type="text" 
              name="name"
              value={client.name} 
              onChange={handleChange} 
              placeholder="Name" 
              required 
            />
          </div>
          <div>
            <label>Address:</label>
            <input 
              type="text" 
              name="address"
              value={client.address} 
              onChange={handleChange} 
              placeholder="Address" 
              required 
            />
          </div>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              name="email"
              value={client.email} 
              onChange={handleChange} 
              placeholder="Email" 
              required 
            />
          </div>
          <div>
            <label>Phone:</label>
            <input 
              type="tel" 
              name="phone"
              value={client.phone} 
              onChange={handleChange} 
              placeholder="Phone" 
              required 
            />
          </div>
          <button type="submit">
            {selectedClient ? "Update Client" : "Add Client"}
          </button>
        </form>
      </div>
    </div>
  );
}
