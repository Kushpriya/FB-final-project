import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../assets/css/Merchandise.css';

export default function MerchandiseList({ rowData, handleEdit, handleDelete, handleView }) {
  const columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true },
    { headerName: 'Category ID', field: 'merchandiseCategoryId', sortable: true, filter: true },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: (params) => (
        <span
          className={
            params.value === 'available'
              ? 'merchandise-status-available'
              : 'merchandise-status-out-of-stock'
          }
        >
          {params.value === 'available' ? 'Available' : 'Out of Stock'}
        </span>
      ),
      sortable: true,
      filter: true,
    },
    { headerName: 'Unit', field: 'unit', sortable: true, filter: true },
    { headerName: 'Category Name', field: 'merchandiseCategory.name', sortable: true, filter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params) => (
        <>
          <button onClick={() => handleView(params.data)} className="merchandise-action-btn">
            <FaEye title="View" />
          </button>
          <button onClick={() => handleEdit(params.data)} className="merchandise-action-btn">
            <FaEdit title="Edit" />
          </button>
          <button onClick={() => handleDelete(params.data.id)} className="merchandise-action-btn">
            <FaTrashAlt title="Delete" />
          </button>
        </>
      ),
      width: 200,
    },
  ];

  return (
    <div className="merchandise-list-container ag-theme-alpine">
      <h2 className="merchandise-list-title">Merchandise List</h2>
      <div className="ag-theme-alpine-dark" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
}
