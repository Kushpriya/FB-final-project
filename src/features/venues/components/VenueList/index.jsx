import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { FaEdit,FaTrashAlt } from 'react-icons/fa';
import './style.css';
import { WiDayThunderstorm } from 'react-icons/wi';

const VenueList = ({ data, clientId, handleDelete, setformOpen, setSelectedVenue }) => {
  const columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Created At', field: 'createdAt', sortable: true, filter: true },
    { headerName: 'Updated At', field: 'updatedAt', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div className="venue-action-icon">
          <button
            onClick={() => {
              setSelectedVenue(params.data);
              setformOpen(true);
            }}
            className="venue-edit-action-btn"
          >
            <FaEdit title="Edit" />
          </button>
          <button onClick={() => handleDelete(clientId, params.data.id)} className="venue-delete-action-btn">
            <FaTrashAlt title="Delete" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ width: '81%' }}>
      <AgGridReact
        rowData={data.getVenuesByClientId}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default VenueList;
