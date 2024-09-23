import React, { useState } from 'react';
import '../../assets/css/Clients.css';

const ClientForm = ({ selectedClient, onClose, onAdd, onUpdate, errorMessage }) => {
  const [formData, setFormData] = useState({
    name: selectedClient?.name || '',
    address: selectedClient?.address || '',
    email: selectedClient?.email || '',
    phone: selectedClient?.phone || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      address: e.target.address.value.trim(),
      phone: e.target.phone.value.trim(),
    };
  
    if (selectedClient) {
      onUpdate(selectedClient, formData); 
    } else {
      onAdd(formData); 
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="client-form-overlay">
      <div className="client-form-container">
      <button className="close-button" onClick={onClose}>X</button>
      <h2>{selectedClient ? 'Edit Client' : 'Add Client'}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    <form onSubmit={handleSubmit}>

      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Client name"
          required
        />
      </label>

      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter Address"
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
        />
      </label>
      <label>
        Phone:
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter Phone Nmuber"
          required
        />
      </label>
        <button type="submit">{selectedClient ? 'Update Client' : 'Add Client'}</button>
    </form>
    </div>
    </div>
  );
};

export default ClientForm;
