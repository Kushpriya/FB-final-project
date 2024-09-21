import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CLIENT_BY_ID } from '../../graphql/queries/ClientQueries';
import '../../assets/css/Clients.css';

const ClientView = ({ clientId, onClose }) => {
  const { loading, error, data } = useQuery(GET_CLIENT_BY_ID, {
    variables: { clientId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">Error: {error.message}</p>;

  const client = data?.getClientById;

  if (!client) return <p className="error-message">Client not found</p>;

  return (
    <div className="client-view-container">
      <button className="close-button" onClick={onClose}>X</button>
      <h1>Client Details</h1>
      <p><strong>Name:</strong> {client.name}</p>
      <p><strong>Email:</strong> {client.email}</p>
      <p><strong>Address:</strong> {client.address}</p>
      <p><strong>Phone:</strong> {client.phone}</p>
      <p><strong>Created At:</strong> {new Date(client.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(client.updatedAt).toLocaleString()}</p>
    </div>
  );
};

export default ClientView;
