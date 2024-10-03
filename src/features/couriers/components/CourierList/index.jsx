import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_COURIER } from '../../graphql/CourierQueries';
import { AgGridReact } from 'ag-grid-react'; 
import { FaEye } from 'react-icons/fa';
import './style.css';

const CourierList = ({ handleView }) => {
  const { loading, error, data } = useQuery(GET_ALL_COURIER);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (data) {
      setRowData(data.getAllCourier);
    }
  }, [data]);

  const columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true , width:100},
    { headerName: 'First Name', field: 'firstName', sortable: true, filter: true },
    { headerName: 'Last Name', field: 'lastName', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params) => (
        <div className='courier-action-icon'>
        <button onClick={() => handleView(params.data)} className="courier-view-action-btn">
        <FaEye title="View" />
      </button>
      </div>
      ),
    },
  ];

  if (loading) return <p>Loading couriers...</p>;
  if (error) return <p>Error loading couriers.</p>;

  return (
    <div className="ag-theme-alpine" style={{ width: '73%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default CourierList;
