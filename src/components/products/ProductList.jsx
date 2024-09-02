import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../assets/css/ProductList.css";
import Slider from '../../components/Slider';

function ProductList({
  products,
  filteredProducts,
  handleEdit,
  handleDelete,
  handleSearch,
  searchTerm,
  handleOpenForm,
}) {

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
  return (
    <>
      <Slider />
      <div className="product-list-container">
        <div className="header">
          <h2>Product List</h2>
          <button className="open-form-btn" onClick={handleOpenForm}>
            Add Product
          </button>
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Value</th>
              <th>Created_at</th>
              <th>Supplier</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price}</td>
                  <td>${product.totalValue}</td>
                  <td>{product.dateAdded}</td>
                  <td>{product.supplier}</td>
                  <td>
                    <span className={`status-indicator ${product.status.toLowerCase()}`}></span>
                    {product.status}
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(product)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductList;
