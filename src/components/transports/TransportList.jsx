import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import '../../assets/css/transports/Transports.css';
import { GET_ALL_TRANSPORTS_QUERY , GET_TRANSPORTS_BY_VEHICLE_TYPE_QUERY} from "../../graphql/queries/TransportQueries";
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';


const TransportList = ({ onView, onEdit, onDelete }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const { loading, error, data } = useQuery(GET_ALL_TRANSPORTS_QUERY);

  const columns = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Vehicle Type", field: "vehicleType", sortable: true, filter: true },
    { headerName: "Status", field: "status", sortable: true, filter: true },
    {
      headerName: "Created At",
      field: "created_at",
      sortable: true,
      filter: "agDateColumnFilter",
      valueFormatter: (params) => formatDate(params.value), 
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="action-icons">
          <FaEye className="view-icon" onClick={() => onView(params.data)} />
          <FaEdit className="edit-icon" onClick={() => onEdit(params.data)} />
          <FaTrashAlt className="delete-icon" onClick={() => onDelete(params.data.id)} />
        </div>
      ),
    },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date.toLocaleString() : 'Invalid Date';
  };
  

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  if (loading) return <p>Loading transports...</p>;
  if (error) return <p>Error loading transports: {error.message}</p>;

  const transports = data?.getAllTransport || [];

 

  return (
    <div className="ag-theme-alpine-dark" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        rowData={transports} 
        columnDefs={columns} 
        defaultColDef={{ flex: 1, minWidth: 150 }}
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={true} 
        paginationPageSizeOptions={[10, 20, 30]} 
      />
    </div>
  );
};

export default TransportList;
