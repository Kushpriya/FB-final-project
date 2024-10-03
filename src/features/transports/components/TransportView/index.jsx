import React from 'react';
import './style.css';

const TransportView = ({ transport, onClose }) => {
  if (!transport) return null;

  return (
    <div className='view-transport-overlay'>
    <div className="view-transport-modal">
      <button className="close-button" onClick={onClose}>X</button>
      <h2>Transport Details</h2>
      <p><strong>Name:</strong> {transport.name}</p>
      <p><strong>Vehicle Type:</strong> {transport.vehicleType}</p>
      <p><strong>Status:</strong> {transport.status}</p>
      <p><strong>Created At:</strong> {transport.createdAt}</p>
      <p><strong>Updated At:</strong> {transport.updatedAt}</p>
    </div>
    </div>
  );
};

export default TransportView;
