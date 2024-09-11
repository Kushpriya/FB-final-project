import React from "react";
import '../../assets/css/Clients.css';
import { FaEye, FaEdit, FaTrashAlt, FaUser } from 'react-icons/fa'; // Import profile icon

const ClientList = ({ clients, onView, onEdit, onDelete }) => {
  return (
    <div className="client-list">
      {clients.length > 0 ? (
        <ul>
          {clients.map((client) => (
            <li key={client.id} className="client-list-item">
              <div className="client-info">
                <FaUser className="profile-icon" />
                <span className="client-id">ID: {client.id}</span>
                <span className="client-name">{client.name}</span>
              </div>
              <div className="action-icons">
                <FaEye className="view-icon" onClick={() => onView(client)} />
                <FaEdit className="edit-icon" onClick={() => onEdit(client)} />
                <FaTrashAlt className="delete-icon" onClick={() => onDelete(client.id)} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No clients available.</p>
      )}
    </div>
  );
};

export default ClientList;
