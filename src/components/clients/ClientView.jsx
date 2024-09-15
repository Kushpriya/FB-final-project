import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENT_BY_ID } from "../../graphql/queries/ClientQueries";
import '../../assets/css/Clients.css';

const ClientView = ({ clientId, onClose }) => {
  const { loading, error, data } = useQuery(GET_CLIENT_BY_ID, {
    variables: { clientId },
    skip: !clientId,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const client = data?.getClientById;

  return (
    <div className="client-view-overlay">
      <div className="client-view-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Client Details</h2>
        {client ? (
          <div>
            <p><strong>ID:</strong> {client.id}</p>
            <p><strong>Name:</strong> {client.name}</p>
            <p><strong>Address:</strong> {client.address}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Phone:</strong> {client.phone}</p>
            <p><strong>Created At:</strong> {new Date(client.createdAt).toLocaleDateString()}</p>
            <p><strong>Updated At:</strong> {new Date(client.updatedAt).toLocaleDateString()}</p>
          </div>
        ) : (
          <p>No client data available.</p>
        )}
      </div>
    </div>
  );
};

export default ClientView;
