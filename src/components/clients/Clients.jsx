import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/css/ClientAdd.css';
import '../../assets/css/ClientList.css';
import ClientAdd from './ClientAdd';
import ClientList from './ClientList';
import Slider from '../../components/Slider';

function Clients() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingClientId, setEditingClientId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      newClient.name &&
      newClient.email &&
      newClient.phone &&
      newClient.address &&
      newClient.company 
    ) {
      if (isEditing) {
        setClients((prevClients) =>
          prevClients.map((client) =>
            client.id === editingClientId ? { ...newClient, id: editingClientId } : client
          )
        );
        setIsEditing(false);
        setEditingClientId(null);
      } else {
        const newId = clients.length + 1;
        setClients((prevClients) => [
          ...prevClients,
          { ...newClient, id: newId },
        ]);
      }

      setNewClient({
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        company: "",
      });
      navigate('/clients/clientlist'); 
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleEdit = (client) => {
    setIsEditing(true);
    setEditingClientId(client.id);
    setNewClient(client);
    navigate('/clients/clientadd');
  };

  const handleDelete = (clientId) => {
    const confirmed = window.confirm("Are you sure you want to delete this client?");
    if (confirmed) {
      setClients(clients.filter((client) => client.id !== clientId));
    }
  };

  const handleOpenForm = () => {
    setFormVisible(true);
    setShowCloseButton(true);
    navigate('/clients/clientadd');
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setShowCloseButton(false);
    navigate('/clients/clientlist');
  };

  return (
    <>
      <Slider />

      <div className="clients-container">
        <div className="clients-content">
          {location.pathname === '/clients/clientadd' && (
            <ClientAdd
              newClient={newClient}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isEditing={isEditing}
              handleCloseForm={handleCloseForm}
              showCloseButton={showCloseButton}
            />
          )}
          {location.pathname === '/clients/clientlist' && (
            <ClientList
              clients={clients}
              filteredClients={filteredClients}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleSearch={handleSearch}
              searchTerm={searchTerm}
              handleOpenForm={handleOpenForm}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Clients;
