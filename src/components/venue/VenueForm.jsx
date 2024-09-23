import React, { useState, useEffect } from 'react';
import '../../assets/css/Venue.css';

const VenueForm = ({ selectedVenue, onClose, onAdd, onUpdate, errorMessage, clientId }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (selectedVenue) {
      setName(selectedVenue.name);
    } else {
      setName('');
    }
  }, [selectedVenue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedVenue) {     
      onUpdate(clientId, selectedVenue.id, name);
    } else {
      onAdd({ clientId, name });
    }
  };

  return (
    <div className="venue-form-container">
      <button className="close-button" onClick={onClose}>X</button>
      <h2>{selectedVenue ? 'Edit Venue' : 'Add Venue'}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit">{selectedVenue ? 'Update Venue' : 'Add Venue'}</button>
      </form>
    </div>
  );
};

export default VenueForm;
