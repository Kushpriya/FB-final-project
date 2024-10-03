import React from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { AgGridReact } from "ag-grid-react";
import "./style.css";

const TransportList = ({ transports, setViewTransport, setSelectedTransport, setIsFormOpen, handleDelete }) => {
    const columnDefs = [
        { headerName: 'Id', field: 'id', sortable: true, filter: true,width:100 },
        { headerName: 'Name', field: 'name', sortable: true, filter: true },
        { headerName: 'Vehicle Type', field: 'vehicleType', sortable: true, filter: true },
        {
          headerName: 'Status',
          field: 'status',
          sortable: true,
          filter: true,
          cellRenderer: (params) => (
            <span
              className={
                params.value === 'available'
                  ? 'transport-status-available'
                  : params.value === 'in_use'
                  ? 'transport-status-in-use'
                  : params.value === 'maintenance'
                  ? 'transport-status-maintenance'
                  : params.value === 'out_of_service'
                  ? 'transport-status-out-of-service'
                  : 'transport-status-default'
              }
            >
              {params.value.charAt(0).toUpperCase() + params.value.slice(1).replace(/_/g, ' ')}
            </span>
          ),
        },
        {
          headerName: 'Actions',
          cellRenderer: (params) => (
            <div className="transport-action-icon">
              <button onClick={() => setViewTransport(params.data)} className="transport-view-action-btn" title="View">
                <FaEye />
              </button>
              <button
                onClick={() => {
                  setSelectedTransport(params.data);
                  setIsFormOpen(true);
                }}
                className="transport-edit-action-btn" title="Edit"
              >
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(params.data.id)} className="transport-delete-action-btn" title="Delete">
                <FaTrashAlt />
              </button>
            </div>
          ),
        },
      ];

  return (
    <div className="ag-theme-alpine" style={{ width:'71.5%' }}>
      <AgGridReact
        rowData={transports}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        // paginationPageSizeSelector={false}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default TransportList;
