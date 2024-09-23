import React, { useState} from 'react';
import { useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [viewVenueId, setViewVenueId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdd = useAddVenue(refetch, setIsModalOpen, setErrorMessage);
  const handleUpdate = useEditVenue(refetch, setIsModalOpen, setErrorMessage);
  const handleDelete = useDeleteVenue(refetch);

  const viewVenue = data?.getVenuesByClientId?.find(venue => venue.id === viewVenueId);

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
          <button onClick={() => setViewVenueId(params.data.id)} className="view-action-btn">
            <FaEye title="View" />
          </button>
          <button
            onClick={() => {
              setSelectedVenue(params.data);
              setIsModalOpen(true);
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
        <button onClick={() => setIsModalOpen(true)} className="venue-add-btn">
          <FaPlus /> Add Venue
        </button>

        <div className="ag-theme-alpine-dark">
          <h1>Venue List for Client {clientId}</h1>
          <AgGridReact
            rowData={data.getVenuesByClientId}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
            className="table"
          />
        </div>

        {isModalOpen && (
          <VenueForm
            selectedVenue={selectedVenue}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedVenue(null);
            }}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            errorMessage={errorMessage}
            clientId={clientId}
          />
        )}

        {viewVenue && (
          <div className="view-venue-modal">
            <button className="close-button" onClick={() => setViewVenueId(null)}>X</button>
            <h2>Venue Details</h2>
            <p><strong>ID:</strong> {viewVenue.id}</p>
            <p><strong>Name:</strong> {viewVenue.name}</p>
            <p><strong>Created At:</strong> {viewVenue.createdAt}</p>
            <p><strong>Updated At:</strong> {viewVenue.updatedAt}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Venue;
