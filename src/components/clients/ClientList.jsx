import React from "react";
import { FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";
import "../../assets/css/ClientList.css";

function ClientList({
    clients,
    filteredClients,
    handleEdit,
    handleDelete,
    searchTerm,
    handleSearch,
    handleOpenForm,
}) {
  return (
    <>
      <div className="clients-container">
        <div className="header">
          <h2>Clients</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search client..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="create-btn" onClick={handleOpenForm}>
            Add Client
          </button>
        </div>
        <div className="stats">
          <div>Total Clients: {clients.length}</div>
        </div>
        <table className="client-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile</th>
              <th>Client Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>
                    <FaUserCircle className="icon profile-icon" />
                  </td>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.address}</td>
                  <td>{client.company}</td>
                  <td>
                    <FaEdit
                      className="icon edit-icon"
                      onClick={() => handleEdit(client)}
                    />
                    <FaTrash
                      className="icon delete-icon"
                      onClick={() => handleDelete(client.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No clients found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ClientList;
