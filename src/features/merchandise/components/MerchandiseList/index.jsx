import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import './style.css';

const MerchandiseList = ({ rowData, setIsFormOpen, setViewMerchandise,setSelectedMerchandise, handleDelete }) => {
    const columnDefs = [
        { headerName: 'ID', field: 'id', sortable: true, filter: true, width:100 },
        { headerName: 'Name', field: 'name', sortable: true, filter: true, width:180 },
        { headerName: 'Price', field: 'price', sortable: true, filter: true, width:155 },
        // { headerName: 'Category ID', field: 'merchandiseCategoryId', sortable: true, filter: true },
        {
          headerName: 'Status',
          field: 'status',
          cellRenderer: (params) => (
            <span className={params.value === 'available' ? 'merchandise-status-available' : 'merchandise-status-out-of-stock'}>
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
            <div className="merchandise-actions">
              <button onClick={() => setViewMerchandise(params.data)} className="merchandise-view-action-btn">
                <FaEye title="View" />
              </button>
              <button
                onClick={() => {
                  setSelectedMerchandise(params.data);
                  setIsFormOpen(true);
                }}
                className="merchandise-edit-action-btn"
              >
                <FaEdit title="Edit" />
              </button>
              <button onClick={() => handleDelete(params.data.id)} className="merchandise-delete-action-btn">
                <FaTrashAlt title="Delete" />
              </button>
            </div>
          ),
          // width: 200,
        },
      ];

  return (
    <div className="ag-theme-alpine" style={{ width:'98%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default MerchandiseList;
