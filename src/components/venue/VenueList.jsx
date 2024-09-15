import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_VENUES } from '../../graphql/queries/VenueQueries';
import { CREATE_VENUE, EDIT_VENUE, DELETE_VENUE } from '../../graphql/mutation/VenueMutation';
import VenueForm from './VenueForm';
import VenueView from './VenueView';
import '../../assets/css/Venue.css';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

const VenueList = ({ clientId }) => {
  const [editingVenue, setEditingVenue] = useState(null);
  const [viewingVenueId, setViewingVenueId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_ALL_VENUES, {
    variables: { clientId },
    skip: !clientId,
    onError: (err) => console.error('Query Error:', err),
  });

  const [createVenue] = useMutation(CREATE_VENUE, {
    onError: (err) => console.error('Create Mutation Error:', err),
    onCompleted: () => {
      refetch();
      setIsFormVisible(false);
    },
  });

  const [editVenue] = useMutation(EDIT_VENUE, {
    onError: (err) => console.error('Edit Mutation Error:', err),
    onCompleted: () => {
      refetch();
      setIsFormVisible(false);
      setEditingVenue(null);
    },
  });

  const [deleteVenue] = useMutation(DELETE_VENUE, {
    onError: (err) => console.error('Delete Mutation Error:', err),
    onCompleted: () => refetch(),
  });

  const handleAdd = () => {
    setEditingVenue(null);
    setIsFormVisible(true);
  };

  const handleEdit = (venue) => {
    setEditingVenue(venue);
    setIsFormVisible(true);
  };

  const handleDelete = (venueId) => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      deleteVenue({ variables: { clientId, venueId } });
    }
  };

  const handleView = (venueId) => {
    setViewingVenueId(venueId);
  };

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>Error loading venues: {error.message}</p>;

  const venues = data ? data.getVenuesByClientId : [];

  return (
    <div className="venue-list-container">
      <button onClick={handleAdd}>Add Venue</button>

      {isFormVisible && (
        <VenueForm
          clientId={clientId}
          venue={editingVenue}
          onAdd={(newVenue) => createVenue({ variables: { clientId, name: newVenue.name } })}
          onEdit={(updatedVenue) => editVenue({ variables: { clientId, venueId: updatedVenue.id, name: updatedVenue.name } })}
          onClose={() => setIsFormVisible(false)}
        />
      )}

      <table className="venue-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.length > 0 ? (
            venues.map((venue) => (
              <tr key={venue.id}>
                <td>{venue.id}</td>
                <td>{venue.name}</td>
                <td>{new Date(venue.createdAt).toLocaleString()}</td>
                <td>{new Date(venue.updatedAt).toLocaleString()}</td>
                <td>
                  <FaEye className="view-icon" onClick={() => handleView(venue.id)} />
                  <FaEdit className="edit-icon" onClick={() => handleEdit(venue)} />
                  <FaTrashAlt className="delete-icon" onClick={() => handleDelete(venue.id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No venues found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {viewingVenueId && <VenueView venueId={viewingVenueId} onClose={() => setViewingVenueId(null)} />}
    </div>
  );
};

export default VenueList;
