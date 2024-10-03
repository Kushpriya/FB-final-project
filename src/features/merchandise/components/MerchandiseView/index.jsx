import React from 'react';
import './style.css';

const MerchandiseView = ({ viewMerchandise, setViewMerchandise }) => {
  return (
    <div className="merchandise-view-overlay">
    <div className="merchandise-view-modal">
      <button className="close-button" onClick={() => setViewMerchandise(null)}>X</button>
      <h2>Merchandise Details</h2>
      <p><strong>ID:</strong> {viewMerchandise.id}</p>
      <p><strong>Name:</strong> {viewMerchandise.name}</p>
      <p><strong>Price: $</strong> {viewMerchandise.price}</p>
      <p><strong>Status: </strong> {viewMerchandise.status}</p>
      <p><strong>Unit: </strong> {viewMerchandise.unit}</p>
      <p><strong>Description: </strong> {viewMerchandise.description}</p>
      <p><strong>Category: </strong> {viewMerchandise.merchandiseCategory.name}</p>
    </div>
    </div>
  );
};

export default MerchandiseView;
