import React from "react";
import '../../assets/css/Clients.css';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; 
import { AgGridReact } from 'ag-grid-react';

const columnDefs = (handleView, handleEdit, handleDelete) => [
  { headerName: 'ID', field: 'id', sortable: true },
  { headerName: 'Name', field: 'name', sortable: true },
  { headerName: 'Email', field: 'email', sortable: true },
  { headerName: 'Address', field: 'address', sortable: true },
  { headerName: 'Phone', field: 'phone', sortable: true },
  { headerName: 'Created At', field: 'createdAt', sortable: true, valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
  { headerName: 'Updated At', field: 'updatedAt', sortable: true, valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
  {
    headerName: 'Actions',
    field: 'actions',
    cellRenderer: (params) => (
      <>
        <button onClick={() => handleView(params.data)} className="client-action-btn">
          <FaEye title="View" />
        </button>
        <button onClick={() => handleEdit(params.data)} className="client-action-btn">
          <FaEdit title="Edit" />
        </button>
        <button onClick={() => handleDelete(params.data.id)} className="client-action-btn">
          <FaTrashAlt title="Delete" />
        </button>
      </>
    ),
    width: 200,
  },
];

const ClientList = ({ clients, handleView, handleEdit, handleDelete }) => {
  return (
    <div className="ag-theme-alpine-dark" style={{ height: '150px', width: '100%' }}>
      <AgGridReact
        rowData={clients}
        columnDefs={columnDefs(handleView, handleEdit, handleDelete)}
        pagination
        paginationPageSize={10}
      />
    </div>
  );
};

export default ClientList;
