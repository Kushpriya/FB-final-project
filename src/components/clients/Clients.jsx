import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import ClientForm from "./ClientForm";
import ClientList from "./ClientList";
import ClientView from "./ClientView";
import '../../assets/css/Clients.css';
import {
  GET_ALL_CLIENTS,
} from "../../graphql/queries/ClientQueries";
import {
  CREATE_CLIENT,
  EDIT_CLIENT,
  DELETE_CLIENT,
} from "../../graphql/mutation/ClientMutation"; 
import { FaPlus } from 'react-icons/fa';

export default function Client() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewingClientId, setViewingClientId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowData, setRowData] = useState([]);

  const { loading, error, data, refetch } = useQuery(GET_ALL_CLIENTS, {
    onError: (err) => console.error("Query Error:", err),
  });

  const [createClient] = useMutation(CREATE_CLIENT);
  const [updateClient] = useMutation(EDIT_CLIENT);
  const [deleteClient] = useMutation(DELETE_CLIENT);

  useEffect(() => {
    if (data) {
      setRowData(data.getAllClients);
    }
  }, [data]);

  const toggleFormVisibility = () => {
    console.log("Toggling form visibility");
    setShowForm(prev => !prev);
    setSelectedClient(null); 
  };
  
  const handleCreate = async (client) => {
    try {
      console.log("Creating client:", client);
      await createClient({ variables: { input: client } });
      refetch();
    } catch (err) {
      console.error("Error creating client:", err);
      alert("An error occurred while creating the client.");
    }
  };

  const handleEdit = async (client) => {
    const { __typename, id, createdAt, updatedAt, ...clientInfo } = client;
  
    try {
      console.log("Editing client:", clientInfo);
      await updateClient({ variables: { clientId: id, clientInfo } });
      refetch();
    } catch (err) {
      console.error("Error updating client:", err);
      alert("An error occurred while updating the client.");
    }
  };
  

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      console.log("Deleting client with ID:", id);
      await deleteClient({ variables: { clientId: id } });
      refetch();
    } catch (err) {
      console.error("Error deleting client:", err);
      alert("An error occurred while deleting the client.");
    }
  };

  const handleView = (client) => {
    console.log("Viewing client:", client);
    setViewingClientId(client.id);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredClients = data
    ? data.getAllClients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm)
      )
    : [];

  if (loading) return <p>Loading clients...</p>;
  if (error) return <p>Error loading clients: {error.message}</p>;

  return (
    <>
      <div className="client-container">
        <div className="filter-section">
          <button className="client-add-btn" onClick={toggleFormVisibility}>
            <FaPlus />
          </button>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        {showForm && (
          <ClientForm
            handleCreate={handleCreate}
            handleEdit={handleEdit}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            toggleFormVisibility={toggleFormVisibility}
          />
        )}

        <ClientList
          clients={filteredClients}
          handleView={handleView}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        {viewingClientId && (
          <ClientView
            clientId={viewingClientId}
            onClose={() => setViewingClientId(null)}
          />
        )}
      </div>
    </>
  );
}
