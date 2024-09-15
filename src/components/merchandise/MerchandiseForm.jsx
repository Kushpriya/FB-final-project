import React, { useState, useEffect } from 'react';
import '../../assets/css/Merchandise.css';

export default function MerchandiseForm({ handleCreate, handleEdit, selectedMerchandise, setSelectedMerchandise, toggleFormVisibility }) {
  const initialFormData = {
    name: '',
    price: '',
    status: '',
    unit: '',
    description: '',
    merchandiseCategoryId: '',
  };

  const [formData, setFormData] = useState(selectedMerchandise || initialFormData);

  useEffect(() => {
    if (selectedMerchandise) {
      setFormData(selectedMerchandise);
    }
  }, [selectedMerchandise]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMerchandise) {
      handleEdit(selectedMerchandise.id, formData);
    } else {
      handleCreate(formData);
    }
    setFormData(initialFormData); 
    setSelectedMerchandise(null);
    toggleFormVisibility(); 
  };

  return (
    <div className="merchandise-form-container">
      <h2 className="merchandise-form-title">
        <button className="close-button" onClick={toggleFormVisibility}>X</button>
        {selectedMerchandise ? 'Edit Merchandise' : 'Create Merchandise'}
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="merchandise-form-label">Name:</label>
        <input
          className="merchandise-form-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label className="merchandise-form-label">Price:</label>
        <input
          className="merchandise-form-input"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <label className="merchandise-form-label">Status:</label>
        <select
          className="merchandise-form-select"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="available">Available</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
        <label className="merchandise-form-label">Unit:</label>
        <input
          className="merchandise-form-input"
          type="text"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          required
        />
        <label className="merchandise-form-label">Description:</label>
        <textarea
          className="merchandise-form-textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label className="merchandise-form-label">Category ID:</label>
        <input
          className="merchandise-form-input"
          type="text"
          name="merchandiseCategoryId"
          value={formData.merchandiseCategoryId}
          onChange={handleChange}
          required
        />
        <button className="merchandise-form-submit-btn" type="submit">
          {selectedMerchandise ? 'Update Merchandise' : 'Create Merchandise'}
        </button>
      </form>
    </div>
  );
}
