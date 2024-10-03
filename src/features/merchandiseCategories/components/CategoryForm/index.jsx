import React, { useState, useEffect } from "react";
import "./style.css";

const MerchandiseCategoryForm = ({ addCategory, editingCategory, updateCategory, onClose }) => {
  const [category, setCategory] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingCategory) {
      setCategory(editingCategory);
    } else {
      setCategory({ name: "", description: "" });
    }
  }, [editingCategory]);

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!category.name || !category.name.trim()) {
      newErrors.name = "Category name is required.";
    }
    if (!category.description || !category.description.trim()) {
      newErrors.description = "Category description is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (editingCategory) {
        updateCategory(editingCategory, category);
      } else {
        addCategory(category);
      }
      onClose();
    }
  };

  return (
    <div className="category-form-overlay">
      <div className="category-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{editingCategory ? "Edit Category" : "Add Category"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            placeholder="Category Name"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <label>Description</label>
          <textarea
            name="description"
            value={category.description}
            onChange={handleChange}
            placeholder="Category Description"
          />
          {errors.description && <p className="error-message">{errors.description}</p>}

          <button type="submit">{editingCategory ? "Update Category" : "Add Category"}</button>
        </form>
      </div>
    </div>
  );
};

export default MerchandiseCategoryForm;
