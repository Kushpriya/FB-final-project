import React, { useState, useEffect } from 'react';
import "../../assets/css/Transports.css";

const vehicleTypes = [
  { value: "", label: "Select Vehicle" },
  { value: "Tank", label: "Tank" },
  { value: "TankWagon", label: "Tank Wagon" },
  { value: "Truck", label: "Truck" },
  { value: "SemiTruck", label: "Semi Truck" },
];

const statusTypes = [
  { value: "", label: "Select Status" },
  { value: "available", label: "Available" },
  { value: "in_use", label: "In Use" },
  { value: "maintenance", label: "Maintenance" },
  { value: "out_of_service", label: "Out of Service" },
];

const TransportForm = ({ onAdd, onUpdate, selectedTransport, errorMessage, onClose }) => {
  const [transport, setTransport] = useState({
    name: '',
    vehicleType: '',
    status: '',
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (selectedTransport) {
      setTransport(selectedTransport);
    }
  }, [selectedTransport]);

  const handleChange = (e) => {
    setTransport({
      ...transport,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transport.name || !transport.vehicleType || !transport.status) {
      setFormError('All fields are required.');
      return;
    }
    setFormError('');
    if (selectedTransport) {
      onUpdate(selectedTransport, transport);
    } else {
      onAdd(transport);
    }
  };

  return (
    <div className="transport-form-overlay">
      <div className="transport-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{selectedTransport ? 'Edit Transport' : 'Add Transport'}</h2>
        {formError && <p className="error-message">{formError}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={transport.name}
            onChange={handleChange}
            placeholder="Enter transport name"
            required
          />
          <label>Vehicle Type</label>
          <select
            name="vehicleType"
            value={transport.vehicleType}
            onChange={handleChange}
            required
          >
            {vehicleTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <label>Status</label>
          <select
            name="status"
            value={transport.status}
            onChange={handleChange}
            required
          >
            {statusTypes.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <button type="submit">
            {selectedTransport ? 'Update Transport' : 'Add Transport'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransportForm;
