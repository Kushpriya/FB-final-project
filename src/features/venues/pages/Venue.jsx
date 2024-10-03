import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FaPlus } from 'react-icons/fa';
import { GET_VENUES_BY_CLIENT_ID } from '../graphql/VenueQueries';
import { useAddVenue } from '../hooks/useAddVenue ';
import { useEditVenue } from '../hooks/useEditVenue';
import {useDeleteVenue } from '../hooks/useDeleteVenue';
import VenueList from '../components/VenueList';
import VenueForm from '../components/VenueForm';
import './Venue.css';
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

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>Error loading venues: {error.message}</p>;

  return (
    <div className="venues-container">
    <div className="venue-header">
      <h1>Venue List</h1>
      <button onClick={() => setformOpen(true)} className="venue-add-btn">
        <FaPlus /> Add Venue
      </button>
      </div>
      <VenueList
        data={data}
        clientId={clientId}
        handleDelete={handleDelete}
        setformOpen={setformOpen}
        setSelectedVenue={setSelectedVenue}
      />

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
  );
};

export default Venue;
