import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import '../../assets/css/transports/Transports.css';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

const TransportList = ({ transports, onView, onEdit, onDelete }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  // Column definitions
  const columns = [
    { 
      headerName: "Name", 
      field: "name", 
      sortable: true, 
      filter: true, 
      checkboxSelection: true, // Allows row selection
      floatingFilter: true      // Adds a filter row beneath the header
    },
    { 
      headerName: "Vehicle Type", 
      field: "vehicleType", 
      sortable: true, 
      filter: true,
      floatingFilter: true 
    },
    { 
      headerName: "Status", 
      field: "status", 
      sortable: true, 
      filter: true,
      floatingFilter: true 
    },
    { 
      headerName: "Capacity", 
      field: "capacity", 
      sortable: true, 
      filter: "agNumberColumnFilter", // Number-specific filter
      floatingFilter: true 
    },
    { 
      headerName: "Description", 
      field: "description", 
      sortable: true, 
      filter: true,
      floatingFilter: true 
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="action-icons">
          <FaEye
            className="view-icon"
            onClick={() => onView(params.data)}
            title="View Transport"
          />
          <FaEdit
            className="edit-icon"
            onClick={() => onEdit(params.data)}
            title="Edit Transport"
          />
          <FaTrashAlt
            className="delete-icon"
            onClick={() => onDelete(params.data)}
            title="Delete Transport"
          />
        </div>
      ),
      width: 150,
    },
  ];

  // Handles the API once the grid is ready
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  // Pagination configuration
  const defaultColDef = {
    resizable: true,  // Columns can be resized
    flex: 1,          // Automatically adjust columns width
    minWidth: 100,
  };

  return (
    <div className="ag-theme-alpine-dark" style={{ height: "500px", width: "100%" }}>
      <AgGridReact
        rowData={transports}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        pagination={true}              // Enables pagination
        paginationPageSize={10}        // Number of rows per page
        rowSelection="multiple"        // Allows selecting multiple rows
        onGridReady={onGridReady}      // Ensures grid API is set up correctly
        animateRows={true}             // Smooth row animations
        domLayout="autoHeight"         // Adjusts the grid height dynamically
      />
    </div>
  );
};

export default TransportList;
