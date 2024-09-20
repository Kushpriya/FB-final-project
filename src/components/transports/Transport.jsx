import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { GET_ALL_TRANSPORTS_QUERY, GET_TRANSPORTS_BY_VEHICLE_TYPE_QUERY } from '../../graphql/queries/TransportQueries';
import { useAddTransport, useEditTransport, useDeleteTransport } from './TransportHandler';
import TransportForm from './TransportForm';
import '../../assets/css/Transports.css';

const Transport = () => {
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [viewTransport, setViewTransport] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const { data, loading, error, refetch } = useQuery(
    selectedVehicleType ? GET_TRANSPORTS_BY_VEHICLE_TYPE_QUERY : GET_ALL_TRANSPORTS_QUERY,
    { 
      variables: selectedVehicleType ? { vehicleType: selectedVehicleType } : {},
     
    }
  );

  useEffect(() => {
    if (selectedVehicleType) {
      refetch({ vehicleType: selectedVehicleType });
    }
  }, [selectedVehicleType, refetch]);

  const handleAdd = useAddTransport(refetch, setIsModalOpen, setErrorMessage);
  const handleUpdate = useEditTransport(refetch, setIsModalOpen, setErrorMessage);
  const handleDelete = useDeleteTransport(refetch);

  const handleVehicleTypeChange = (event) => {
    const selectedType = event.target.value || '';
    setSelectedVehicleType(selectedType);
    refetch({ vehicleType: selectedType });
  };

  if (loading) return <p>Loading transports...</p>;
  if (error) return <p>Error loading transports: {error.message}</p>;

  const transports = selectedVehicleType ? data?.getAllTransportByVehicleType || [] : data?.getAllTransport || [];

  const columnDefs = [
    { headerName: 'Id', field: 'id', sortable: true, filter: true },
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
              setIsModalOpen(true);
            }}
            className="transport-edit-action-btn" title="Edit"
          >
            <FaEdit />
          </button>
          <button onClick={() => handleDelete(params.data.id)} className="transport-delete-action-btn" title="Delete">
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="transport-container">
      <div className="filter-section">
        <div className="total-transports">
          Total {selectedVehicleType ? `${selectedVehicleType} ` : ''}Transports: {transports.length}
        </div>
        <div>
          <label>Filter by Vehicle Type: </label>
          <select onChange={handleVehicleTypeChange} value={selectedVehicleType}>
            <option value="">All Vehicles</option>
            <option value="Tank">Tank</option>
            <option value="TankWagon">Tank Wagon</option>
            <option value="Truck">Truck</option>
            <option value="SemiTruck">Semi Truck</option>
          </select>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="add-transport-btn">
          <FaPlus /> Add Transport
        </button>
      </div>
     
      <div className="ag-theme-alpine-dark"style={{ width: '90%', height: '10%' }}>
        <AgGridReact
          rowData={transports}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={false}
          domLayout="autoHeight"
        />
      </div>
  
      {isModalOpen && (
        <TransportForm
          selectedTransport={selectedTransport}
          onClose={() => {
            setSelectedTransport(null);
            setIsModalOpen(false);
          }}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          errorMessage={errorMessage}
        />
      )}
      {viewTransport && (
        <div className="view-transport-modal">
          <button className="close-button" onClick={() => setViewTransport(null)}>X</button>
          <h2>Transport Details</h2>
          <p><strong>Name:</strong> {viewTransport.name}</p>
          <p><strong>Vehicle Type:</strong> {viewTransport.vehicleType}</p>
          <p><strong>Status:</strong> {viewTransport.status}</p>
          <p><strong>Created At:</strong> {viewTransport.createdAt}</p>
          <p><strong>Updated At:</strong> {viewTransport.updatedAt}</p>
        </div>
      )}
    </div>
  );
};

export default Transport;
