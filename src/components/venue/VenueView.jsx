import React from 'react';
import { useQuery } from '@apollo/client';
// import { GET_VENUE_BY_ID } from '../../graphql/queries/VenueQueries';
import '../../assets/css/Venue.css';

const VenueView = ({ venueId, onClose }) => {
  const { loading, error, data } = useQuery(GET_VENUE_BY_ID, {
    variables: { venueId },
    skip: !venueId,
    onError: (err) => console.error('Query Error:', err),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading venue: {error.message}</p>;

  const venue = data ? data.getVenueById : null;

  return (
    <div className="venue-view-overlay">
      <div className="venue-view-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Venue Details</h2>
        {venue ? (
          <div>
            <p><strong>ID:</strong> {venue.id}</p>
            <p><strong>Name:</strong> {venue.name}</p>
            <p><strong>Created At:</strong> {new Date(venue.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(venue.updatedAt).toLocaleString()}</p>
          </div>
        ) : (
          <p>No venue data available.</p>
        )}
      </div>
    </div>
  );
};

export default VenueView;
