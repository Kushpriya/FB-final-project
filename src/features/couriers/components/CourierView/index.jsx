import React from 'react';
import './style.css';

const CourierView = ({ viewCourier, setViewCourier }) => {
  return (
    <div className="courier-view-overlay">
      <div className="courier-view-modal">
        <button className="close-button" onClick={() => setViewCourier(null)}>X</button>
        <h2>Courier Details</h2>
        <p><strong>ID:</strong> {viewCourier.id}</p>
        <p><strong>First Name:</strong> {viewCourier.firstName}</p>
        <p><strong>Last Name:</strong> {viewCourier.lastName}</p>
        <p><strong>Email:</strong> {viewCourier.email}</p>
        <p><strong>Bio:</strong> {viewCourier.bio}</p>
        <p><strong>Tenant ID:</strong> {viewCourier.tenantId}</p>
      </div>
    </div>
  );
};

export default CourierView;
