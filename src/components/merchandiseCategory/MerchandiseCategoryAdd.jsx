import React, { useState, useEffect } from "react";
import "../../assets/css/MerchandiseCategory.css";

const MerchandiseCategoryAdd = ({ addCategory, editingCategory, updateCategory, onClose }) => {
  const [category, setCategory] = useState({ name: "", description: "" });

  useEffect(() => {
    if (editingCategory) {
      setCategory(editingCategory);
    }
  }, [editingCategory]);

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editingCategory ? updateCategory(category) : addCategory(category);
    onClose();
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
            required
          />
          <label>Description</label>
          <textarea
            name="description"
            value={category.description}
            onChange={handleChange}
            placeholder="Category Description"
            required
          />
          <button type="submit">{editingCategory ? "Update Category" : "Add Category"}</button>
        </form>
      </div>
    </div>
  );
};

export default MerchandiseCategoryAdd;
