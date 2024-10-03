import React, { useState, useEffect } from 'react';
import './style.css';

const vehicleTypes = [
  { value: '', label: 'Select Vehicle' },
  { value: 'tank', label: 'Tank' },
  { value: 'tank_wagon', label: 'Tank Wagon' },
  { value: 'truck', label: 'Truck' },
  { value: 'semi_truck', label: 'Semi Truck' },
];

const statusTypes = [
  { value: '', label: 'Select Status' },
  { value: 'available', label: 'Available' },
  { value: 'in_use', label: 'In Use' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'out_of_service', label: 'Out of Service' },
];

const TransportForm = ({ onAdd, onUpdate, selectedTransport, errorMessage, onClose }) => {
  const [transport, setTransport] = useState({
    name: '',
    vehicleType: '',
    status: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedTransport) {
      setTransport(selectedTransport);
    }
  }, [selectedTransport]);

  const validate = () => {
    const newErrors = {};
    if (!transport.name.trim()) newErrors.name = 'Name is required';
    if (!transport.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
    if (!transport.status) newErrors.status = 'Status is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setTransport({
      ...transport,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (selectedTransport) {
        onUpdate(selectedTransport.id, transport);
      } else {
        onAdd(transport);
      }
      onClose();
    }
  };

  return (
    <div className="transport-form-overlay">
      <div className="transport-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{selectedTransport ? 'Edit Transport' : 'Add Transport'}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={transport.name}
              onChange={handleChange}
              placeholder="Enter transport name"
              required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </label>

          <label>
            Vehicle Type:
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
            {errors.vehicleType && <p className="error-message">{errors.vehicleType}</p>}
          </label>

          <label>
            Status:
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
            {errors.status && <p className="error-message">{errors.status}</p>}
          </label>

          <button type="submit">
            {selectedTransport ? 'Update Transport' : 'Add Transport'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransportForm;
