import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { GET_ALL_CLIENTS } from '../../graphql/queries/ClientQueries';
import { useAddClient, useEditClient, useDeleteClient } from './ClientHandler';
import ClientForm from './ClientForm';
import ClientView from './ClientView';
import '../../assets/css/Clients.css';

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
    navigate(`/venue/${clientId}`);
  };

  const columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'Address', field: 'address', sortable: true, filter: true },
    { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div className="client-action-icon">
          <button onClick={() => setViewClientId(params.data.id)} className="view-action-btn">
            <FaEye title="View" />
          </button>
          <button
            onClick={() => {
              setSelectedClient(params.data);
              setformOpen(true);
            }}
            className="edit-action-btn"
          >
            <FaEdit title="Edit" />
          </button>
          <button onClick={() => handleDelete(params.data.id)} className="delete-action-btn">
            <FaTrash title="Delete" />
          </button>
        </div>
      ),
    },
    {
      headerName: 'Branch details',
      field: 'branch',
      cellRenderer: (params) => (
        <button 
          onClick={() => handleShowClick(params.data.id)} 
          className="branch-details-btn"
        >
          Show
        </button>
      ),
    }
  ];

  if (loading) return <p>Loading clients...</p>;
  if (error) return <p className="error-message">Error loading clients: {error.message}</p>;

  return (
    <>
      <div className="clients-container">
        <button onClick={() => setformOpen(true)} className="client-add-btn">
          <FaPlus /> Add Client
        </button>
        <div className="ag-theme-alpine-dark">
          <AgGridReact
            rowData={data.getAllClients}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
          />
        </div>

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

        {viewClientId && <ClientView clientId={viewClientId} />}
      </div>
    </>
  );
};

export default Clients;
