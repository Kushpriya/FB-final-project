import React, { useState } from 'react';
import './style.css';

const ClientForm = ({ selectedClient, onClose, onAdd, onUpdate, errorMessage }) => {
  const [formData, setFormData] = useState({
    name: selectedClient?.name || '',
    address: selectedClient?.address || '',
    email: selectedClient?.email || '',
    phone: selectedClient?.phone || '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Valid phone number is required (10 digits)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
      };
      if (selectedClient) {
        onUpdate(selectedClient.id, data); 
      } else {
        onAdd(data); 
      }
      onClose();
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
            {errors.name && <p className="error-message">{errors.name}</p>}
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
            {errors.address && <p className="error-message">{errors.address}</p>}
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
            {errors.email && <p className="error-message">{errors.email}</p>}
          </label>
          
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              required
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </label>
          
          <button type="submit">{selectedClient ? 'Update Client' : 'Add Client'}</button>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
