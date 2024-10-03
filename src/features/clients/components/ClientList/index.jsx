import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { FaEye, FaEdit, FaCodeBranch, FaTrashAlt } from 'react-icons/fa';
import './style.css';

const ClientList = ({
  clients,
  onShowVenue,
  onViewClient,
  onEditClient,
  onDeleteClient,
}) => {
  const columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true,width:100 },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true,width:300 },
    { headerName: 'Address', field: 'address', sortable: true, filter: true },
    { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
    {
      headerName: 'Actions', width: 240,
      cellRenderer: (params) => (
        <div className="client-action-icon">
          <button onClick={() => onShowVenue(params.data.id)} className="client-branch-action-btn">
            <FaCodeBranch title='Venue'/>
          </button>
          <button onClick={() => onViewClient(params.data.id)} className="client-view-action-btn">
            <FaEye title="View" />
          </button>
          <button
            onClick={() => onEditClient(params.data)}
            className="client-edit-action-btn"
          >
            <FaEdit title="Edit" />
          </button>
          <button onClick={() => onDeleteClient(params.data.id)} className="client-delete-action-btn">
            <FaTrashAlt title="Delete" />
          </button>
        </div>
      ),
    },
  ];

  return (
      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={clients}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
        />
      </div>
  );
};

export default ClientList;
