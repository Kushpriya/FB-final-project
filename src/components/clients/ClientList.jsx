import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import '../../assets/css/ClientList.css';

import { FaUserCircle, FaEdit, FaTrash } from "react-icons/fa";

const ClientList = ({ rowData, onEditClient, onDeleteClient }) => {
  const columnDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    {
      headerName: "Profile",
      field: "profile",
      cellRendererFramework: () => <FaUserCircle className="profile-icon" />,
    },
    {
      headerName: "Name",
      field: "firstName",
      valueGetter: (params) =>
        `${params.data.firstName} ${params.data.lastName}`,
    },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Phone", field: "phone", sortable: true, filter: true },
    { headerName: "Location", field: "address", sortable: true, filter: true },
    { headerName: "Company", field: "companyName", sortable: true, filter: true },
    { headerName: "Orders", field: "orders", sortable: true },
    { headerName: "Amount Spent", field: "amountSpent", sortable: true },
    {
      headerName: "Email Subscription",
      field: "emailSubscription",
      cellRendererFramework: (params) => {
        const subscription = params.value;
        let colorClass = "";
        if (subscription === "Subscribed") colorClass = "subscribed";
        if (subscription === "Not subscribed") colorClass = "not-subscribed";
        if (subscription === "Pending") colorClass = "pending";
        return <span className={colorClass}>{subscription}</span>;
      },
    },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params) => (
        <>
          <button onClick={() => onEditClient(params.data.id)}>
            <FaEdit />
          </button>
          <button onClick={() => onDeleteClient(params.data.id)}>
            <FaTrash />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

export default ClientList;
