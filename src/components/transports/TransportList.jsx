import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const TransportList = ({ transports }) => {
  const columns = [
    { headerName: "Name", field: "name" },
    { headerName: "Vehicle Type", field: "vehicleType" },
    { headerName: "Status", field: "status" },
    { headerName: "Capacity", field: "capacity" },
    { headerName: "Description", field: "description" },
  ];

  return (
    <div className="ag-theme-alpine-dark" style={{ height: 400, width: "100%" }}>
      <AgGridReact rowData={transports} columnDefs={columns} />
    </div>
  );
};

export default TransportList;
