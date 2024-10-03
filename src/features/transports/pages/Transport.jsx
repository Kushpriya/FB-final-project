import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FaPlus } from 'react-icons/fa';
import { GET_ALL_TRANSPORTS_QUERY, GET_TRANSPORTS_BY_VEHICLE_TYPE_QUERY } from '../graphql/TransportQueries';
import { useAddTransport } from '../hooks/useAddTransport';
import { useEditTransport } from '../hooks/useEditTransport';
import { useDeleteTransport } from '../hooks/useDeleteTransport';
import TransportView from '../components/TransportView';
import TransportList from '../components/TransportList';
import './Transport.css';
import TransportForm from '../components/TransportForm';

const Transport = () => {
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
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

  const handleAdd = useAddTransport(refetch, setIsFormOpen, setErrorMessage);
  const handleUpdate = useEditTransport(refetch, setIsFormOpen, setErrorMessage);
  const handleDelete = useDeleteTransport(refetch);

  const handleVehicleTypeChange = (event) => {
    const selectedType = event.target.value || '';
    setSelectedVehicleType(selectedType);
    refetch({ vehicleType: selectedType });
  };

  if (loading) return <p>Loading transports...</p>;
  if (error) return <p>Error loading transports: {error.message}</p>;

  const transports = selectedVehicleType ? data?.getAllTransportByVehicleType || [] : data?.getAllTransport || [];

  return (
    <div className="transport-container">
      <div className="filter-section">
      <h2>Transport List</h2>

        <div className="total-transports">

          Total {selectedVehicleType ? `${selectedVehicleType} ` : ''}Transports: {transports.length}
        </div>
        <div>

          <label>Filter by Vehicle Type: </label>
          <select onChange={handleVehicleTypeChange} value={selectedVehicleType}>
            <option value="">All Vehicles</option>
            <option value="tank">Tank</option>
            <option value="tank_wagon">Tank Wagon</option>
            <option value="truck">Truck</option>
            <option value="semi_truck">Semi Truck</option>
          </select>
        </div>
        <button onClick={() => setIsFormOpen(true)} className="add-transport-btn">
          <FaPlus /> Add Transport
        </button>
      </div>
     
      <TransportList 
        transports={transports} 
        setViewTransport={setViewTransport}
        setSelectedTransport={setSelectedTransport} 
        setIsFormOpen={setIsFormOpen} 
        handleDelete={handleDelete}
      />
  
      {isFormOpen && (
        <TransportForm
          selectedTransport={selectedTransport}
          onClose={() => {
            setSelectedTransport(null);
            setIsFormOpen(false);
          }}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          errorMessage={errorMessage}
        />
      )}
      {viewTransport && (
        <TransportView
          transport={viewTransport}
          onClose={() => setViewTransport(null)}
        />
      )}
    </div>
  );
};

export default Transport;
