import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_CLIENTS } from '../graphql/ClientQueries';
import { useAddClient} from '../hooks/useAddClient';
import { useEditClient} from '../hooks/useEditClient';
import { useDeleteClient } from '../hooks/useDeleteClient';
import ClientForm from '../components/ClientForm';
import ClientView from '../components/ClientView';
import ClientList from '../components/ClientList';
import './Client.css';
import { FaPlus } from 'react-icons/fa';
import { APP_URL } from '../../../constants/APP_URL'; 



const Clients = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_ALL_CLIENTS);
  const [formOpen, setformOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewClientId, setViewClientId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdd = useAddClient(refetch, setformOpen, setErrorMessage);
  const handleUpdate = useEditClient(refetch, setformOpen, setErrorMessage);
  const handleDelete = useDeleteClient(refetch);

  const handleShowClick = (clientId) => {
    navigate(`${APP_URL.VENUE(clientId)}`);
  };

  if (loading) return <p>Loading clients...</p>;
  if (error) return <p className="error-message">Error loading clients: {error.message}</p>;

  return (
    <>
     <div className="client-container">
     <button  className="client-add-btn" onClick={() => setformOpen(true)}>
        <FaPlus /> Add Client
      </button>
      <ClientList
        clients={data.getAllClients}
        onShowVenue={handleShowClick}
        onViewClient={(id) => setViewClientId(id)}
        onEditClient={(client) => {
          setSelectedClient(client);
          setformOpen(true);
        }}
        onDeleteClient={handleDelete}
        onAddClient={() => setformOpen(true)}
      />

      {formOpen && (
        <ClientForm
          selectedClient={selectedClient}
          onClose={() => {
            setformOpen(false);
            setSelectedClient(null);
          }}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          errorMessage={errorMessage}
        />
      )}

      {viewClientId && (
        <ClientView
          clientId={viewClientId} 
          onClose={() => setViewClientId(null)} 
        />
      )}
      </div>
    </>
  );
};

export default Clients;
