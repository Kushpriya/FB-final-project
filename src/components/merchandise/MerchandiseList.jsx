import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import "../../assets/css/MerchandiseList.css";

function MerchandiseList({
  merchandiseItems,  
  filteredMerchandise = [],  
  handleEdit,
  handleDelete,
  handleSearch,
  searchTerm,
  handleOpenForm,
}) {
  const [selectedMerchandise, setSelectedMerchandise] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  const handleView = (merchandise) => {
    setSelectedMerchandise(merchandise);
  };

  return (
    <>
      <div className="merchandise-list-container">
        <div className="header">
          <h2>Merchandise List</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search merchandise..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="open-form-btn" onClick={handleOpenForm}>
            Add Merchandise
          </button>
        </div>
        <div className="total-merchandise">
          <p>Total Merchandise: {filteredMerchandise.length}</p>
        </div>

        <table className="merchandise-table">
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
            {filteredMerchandise.length > 0 ? (
              filteredMerchandise.map((merchandise) => (
                <tr key={merchandise.id}>
                  <td>{merchandise.id}</td>
                  <td>{merchandise.name}</td>
                  <td>{merchandise.category}</td>
                  <td>{merchandise.quantity}</td>
                  <td>${merchandise.price}</td>
                  <td>${merchandise.totalValue}</td>
                  <td>{formatDate(merchandise.dateAdded)}</td>
                  <td>
                    <span className={`status-indicator ${merchandise.status.toLowerCase()}`}></span>
                    {merchandise.status}
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => handleView(merchandise)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(merchandise)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(merchandise.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No merchandise found</td>
              </tr>
            )}
          </tbody>
        </table>

        {selectedMerchandise && (
          <div className="merchandise-details-modal">
            <h2>Merchandise Details</h2>
            <p><strong>ID:</strong> {selectedMerchandise.id}</p>
            <p><strong>Name:</strong> {selectedMerchandise.name}</p>
            <p><strong>Category:</strong> {selectedMerchandise.category}</p>
            <p><strong>Description:</strong> {selectedMerchandise.description}</p>
            <p><strong>Quantity:</strong> {selectedMerchandise.quantity}</p>
            <p><strong>Price:</strong> ${selectedMerchandise.price}</p>
            <p><strong>Total Value:</strong> ${selectedMerchandise.totalValue}</p>
            <p><strong>Created_at:</strong> {formatDate(selectedMerchandise.dateAdded)}</p>
            <p><strong>Status:</strong> {selectedMerchandise.status}</p>
            <button onClick={() => setSelectedMerchandise(null)}>Close</button>
          </div>
        )}
      </div>
    </>
  );
}

export default MerchandiseList;
