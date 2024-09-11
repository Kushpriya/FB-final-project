import React, { useState } from "react";
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
  UPDATE_CLIENT,
  DELETE_CLIENT,
} from "../../graphql/mutation/ClientMutation"; 

const Client = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingClient, setEditingClient] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewingClientId, setViewingClientId] = useState(null);

  const { loading, error, data, refetch } = useQuery(GET_ALL_CLIENTS, {
    onError: (err) => console.error("Query Error:", err),
  });

  const [createClient] = useMutation(CREATE_CLIENT, {
    onError: (err) => console.error("Create Mutation Error:", err),
    onCompleted: () => {
      refetch();
      // setIsFormVisible(false);
    },
  });

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    onError: (err) => console.error("Update Mutation Error:", err),
    onCompleted: () => {
      refetch();
      // setEditingClient(null);
      // setIsFormVisible(false);
    },
  });

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    onError: (err) => console.error("Delete Mutation Error:", err),
    onCompleted: () => refetch(),
  });

  const addClient = async (client) => {
    try {
      await createClient({ variables: { name: client.name } });
    } catch (err) {
      console.error("Error creating client:", err);
      alert("An error occurred while creating the client.");
    }
  };

  const handleUpdate = async (client) => {
    try {
      await updateClient({ variables: { clientId: client.id, clientName: client.name } });
    } catch (err) {
      console.error("Error updating client:", err);
      alert("An error occurred while updating the client.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      await deleteClient({ variables: { clientId: id } });
    } catch (err) {
      console.error("Error deleting client:", err);
      alert("An error occurred while deleting the client.");
    }
  };

  const handleView = (client) => {
    setViewingClientId(client.id);
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setIsFormVisible(true);
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
      {/* <Slider /> */}
      <div className="client-container">
        <div className="filter-section">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <button
            onClick={() => {
              setIsFormVisible(true);
              setEditingClient(null);
            }}
          >
            Add Client
          </button>
        </div>

        {isFormVisible && (
          <ClientForm
            addClient={addClient}
            editingClient={editingClient}
            updateClient={handleUpdate}
            onClose={() => setIsFormVisible(false)}
          />
        )}

        <ClientList
          clients={filteredClients}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
};

export default Client;
