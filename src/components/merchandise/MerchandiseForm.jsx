import React, { useState, useEffect } from 'react';
import '../../assets/css/Merchandise.css';

export default function MerchandiseForm({
  handleCreate,
  handleEdit,
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

  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState(selectedMerchandise || initialFormData);

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
    const { name, price, unit, merchandiseCategoryId } = formData;
    
    if (!name.trim()) {
      return 'Name is required and cannot be empty.';
    }

    if (price === '' || isNaN(price) || parseFloat(price) <= 0) {
      return 'Price must be a positive number.';
    }

    if (!unit.trim()) {
      return 'Unit is required and cannot be empty.';
    }

    if (!merchandiseCategoryId) {
      return 'Please select a category.';
    }

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    
    if (validationError) {
      setFormError(validationError);
      return;
    }
    
    setFormError('');

    if (selectedMerchandise) {
      handleEdit(selectedMerchandise.id, formData);
    } else {
      handleCreate(formData);
    }

    setSelectedMerchandise(null);
  };

  return (
    <div className="merchandise-form-overlay">
      <div className="merchandise-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        {formError && <p className="error-message">{formError}</p>}
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
          
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter Price"
            required
          />
          
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

          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
          />
          
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
          
          <button type="submit">
            {selectedMerchandise ? 'Update Merchandise' : 'Create Merchandise'}
          </button>
        </form>
      </div>
    </div>
  );
}
