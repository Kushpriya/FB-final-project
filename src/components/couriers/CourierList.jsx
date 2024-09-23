
import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../assets/css/CourierForm.css";

const CourierList = ({ couriers }) => {
  const columns = [
    {
      headerName: "Profile",
      field: "image",
      cellRendererFramework: (params) => (
        <img
          src={params.value ? params.value : "https://via.placeholder.com/50"}
          alt="Courier"
          width="50"
          height="50"
        />
      ),
    },
    { headerName: "First Name", field: "firstName" },
    { headerName: "Email", field: "email" },
    { headerName: "Address", field: "address" },
    { headerName: "Transport", field: "transport" },
    { headerName: "Bio", field: "bio" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height:100, width: "80%", color: "#333" }}>
      <AgGridReact rowData={couriers} columnDefs={columns} />
    </div>
  );
};

export default CourierList;
