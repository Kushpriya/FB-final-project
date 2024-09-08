import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import "../../assets/css/merchandise/MerchandiseList.css";

function MerchandiseList({
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

  const columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Merchandise', field: 'name', sortable: true, filter: true },
    { headerName: 'Category', field: 'category', sortable: true, filter: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true, cellRenderer: (params) => `$${params.value}` },
    { headerName: 'Created_at', field: 'dateAdded', sortable: true, filter: true, valueFormatter: ({ value }) => formatDate(value) },
    { headerName: 'Status', field: 'status', sortable: true, filter: true, cellRenderer: StatusCellRenderer },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params) => (
        <div className="actions-cell">
          <button className="view-btn" onClick={() => handleView(params.data)}>
            <FaEye />
          </button>
          <button className="edit-btn" onClick={() => handleEdit(params.data)}>
            <FaEdit />
          </button>
          <button className="delete-btn" onClick={() => handleDelete(params.data.id)}>
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

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

        <div className="ag-theme-alpine-dark" style={{ height: 400 }}>
          <AgGridReact
            rowData={filteredMerchandise}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
          />
        </div>

        {selectedMerchandise && (
          <div className="merchandise-details-modal">
            <h2>Merchandise Details</h2>
            <p><strong>ID:</strong> {selectedMerchandise.id}</p>
            <p><strong>Name:</strong> {selectedMerchandise.name}</p>
            <p><strong>Category:</strong> {selectedMerchandise.category}</p>
            <p><strong>Quantity:</strong> {selectedMerchandise.quantity}</p>
            <p><strong>Price:</strong> ${selectedMerchandise.price}</p>
            <p><strong>Total Value:</strong> ${selectedMerchandise.totalValue}</p>
            <p><strong>Created_at:</strong> {formatDate(selectedMerchandise.dateAdded)}</p>
            <p><strong>Status:</strong> {selectedMerchandise.status}</p>
            <p><strong>Description:</strong> {selectedMerchandise.description}</p>
            <button onClick={() => setSelectedMerchandise(null)}>Close</button>
          </div>
        )}
      </div>
    </>
  );
}

const StatusCellRenderer = ({ value }) => {
  const statusClass = value.toLowerCase();
  return (
    <span className={`status-indicator ${statusClass}`}>
      <span className="indicator"></span>
      {value}
    </span>
  );
};

export default MerchandiseList;
