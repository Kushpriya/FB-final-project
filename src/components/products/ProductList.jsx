import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import "../../assets/css/ProductList.css";

function ProductList({
  products,
  filteredProducts,
  handleEdit,
  handleDelete,
  handleSearch,
  searchTerm,
  handleOpenForm,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const totalProducts = products.length;

  const handleView = (product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <div className="product-list-container">
        <div className="header">
          <h2>Product List</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search order..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="open-form-btn" onClick={handleOpenForm}>
            Add Product
          </button>
</div>
        <div className="total-products">
            <p>Total Products: {totalProducts}</p>
          </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Value</th>
              <th>Created_at</th>
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
                  <td>{product.quantity}</td>
                  <td>${product.price}</td>
                  <td>${product.totalValue}</td>
                  <td>{product.dateAdded}</td>
                  <td>
                    <span className={`status-indicator ${product.status.toLowerCase()}`}></span>
                    {product.status}
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => handleView(product)}
                    >
                      <FaEye />
                    </button>
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

        {selectedProduct && (
          <div className="product-details-modal">
            <h2>Product Details</h2>
            <p><strong>ID:</strong> {selectedProduct.id}</p>
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Total Value:</strong> ${selectedProduct.totalValue}</p>
            <p><strong>Created_at:</strong> {selectedProduct.dateAdded}</p>
            <p><strong>Status:</strong> {selectedProduct.status}</p>
            <button onClick={() => setSelectedProduct(null)}>Close</button>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductList;
