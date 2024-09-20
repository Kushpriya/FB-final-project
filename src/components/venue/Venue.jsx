import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { GET_VENUES_BY_CLIENT_ID } from '../../graphql/queries/VenueQueries';
import { useAddVenue, useEditVenue, useDeleteVenue } from './VenueHandler';
import VenueForm from './VenueForm';
import '../../assets/css/Venue.css';
import { useParams } from 'react-router-dom';

const Venue = () => {
  const { clientId } = useParams();

  const { loading, error, data, refetch } = useQuery(GET_VENUES_BY_CLIENT_ID, {
    variables: { clientId },
  });

  const [formOpen, setformOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdd = useAddVenue(refetch, setformOpen, setErrorMessage);
  const handleUpdate = useEditVenue(refetch, setformOpen, setErrorMessage);
  const handleDelete = useDeleteVenue(refetch);

  console.log('Fetched data:', data);

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
            className="edit-action-btn"
          >
            <FaEdit title="Edit" />
          </button>
          <button onClick={() => handleDelete(clientId, params.data.id)} className="delete-action-btn">
            <FaTrash title="Delete" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>Error loading venues: {error.message}</p>;

  return (
    <>
      <div className="venues-container">
        <button onClick={() => setformOpen(true)} className="venue-add-btn">
          <FaPlus /> Add Venue
        </button>
        <h1>Venue List</h1>

        <div className="ag-theme-alpine-dark">
          <AgGridReact
            rowData={data.getVenuesByClientId}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
            className="table"
          />
        </div>

        {formOpen && (
          <VenueForm
            selectedVenue={selectedVenue}
            onClose={() => {
              setformOpen(false);
              setSelectedVenue(null);
            }}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            errorMessage={errorMessage}
            clientId={clientId}
          />
        )}
      </div>
    </>
  );
};

export default Venue;
