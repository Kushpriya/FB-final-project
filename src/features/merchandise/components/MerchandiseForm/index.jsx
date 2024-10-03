import React, { useState, useEffect } from 'react';
import './style.css';

export default function MerchandiseForm({
  onAdd,
  onUpdate,
  selectedMerchandise,
  setSelectedMerchandise,
  categories,
  errorMessage,
  onClose
}) {
  const initialFormData = {
    name: '',
    price: '',
    status: 'available',
    unit: '',
    description: '',
    merchandiseCategoryId: '',
  };

  const [formData, setFormData] = useState(selectedMerchandise || initialFormData);
  const [errors, setErrors] = useState({}); 

  useEffect(() => {
    if (selectedMerchandise) {
      setFormData(selectedMerchandise);
    } else {
      setFormData(initialFormData);
    }
  }, [selectedMerchandise]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, price, unit, merchandiseCategoryId } = formData;

    if (!name.trim()) {
      newErrors.name = 'Name is required and cannot be empty.';
    }

    if (price === '' || isNaN(price) || parseFloat(price) <= 0) {
      newErrors.price = 'Price must be a positive number.';
    }

    if (!unit.trim()) {
      newErrors.unit = 'Unit is required and cannot be empty.';
    }

    if (!merchandiseCategoryId) {
      newErrors.category = 'Please select a category.';
    }

    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setErrors({}); 

      if (selectedMerchandise) {
        onUpdate(selectedMerchandise.id, formData);
      } else {
        onAdd(formData);
      }

      setSelectedMerchandise(null);
      onClose();
    }
  };

  return (
    <div className="merchandise-form-overlay">
      <div className="merchandise-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <h2>
          {selectedMerchandise ? 'Edit Merchandise' : 'Create Merchandise'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter merchandise name"
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter Price"
            required
          />
          {errors.price && <p className="error-message">{errors.price}</p>}

          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>

          <label>Unit:</label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="Enter Unit"
            required
          />
          {errors.unit && <p className="error-message">{errors.unit}</p>}

          <label>Category:</label>
          <select
            name="merchandiseCategoryId"
            value={formData.merchandiseCategoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="error-message">{errors.category}</p>}


          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
          />
          <button type="submit">
            {selectedMerchandise ? 'Update Merchandise' : 'Create Merchandise'}
          </button>
        </form>
      </div>
    </div>
  );
}
