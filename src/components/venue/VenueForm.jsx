import React, { useState, useEffect } from 'react';
import '../../assets/css/Venue.css';

const VenueForm = ({ clientId, venue, onAdd, onEdit, onClose }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (venue) {
      setName(venue.name);
    }
  }, [venue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (venue) {
      onEdit({ id: venue.id, name });
    } else {
      onAdd({ name });
    }
  };

  return (
    <div className="venue-form-overlay">
      <div className="venue-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{venue ? 'Edit Venue' : 'Add Venue'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Venue Name"
            required
          />
          <button type="submit">{venue ? 'Update Venue' : 'Add Venue'}</button>
        </form>
      </div>
    </div>
  );
};

export default VenueForm;
