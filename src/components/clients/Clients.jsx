import React, { useState } from "react";
import '../../assets/css/ClientAdd.css';
import '../../assets/css/ClientList.css';
import ClientAdd from "./ClientAdd";
import ClientList from "./ClientList";
import Slider from '../../components/Slider';
const Clients = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      profile: "",
      firstName: "Esther",
      lastName: "Howard",
      email: "esther.howard@example.com",
      phone: "(123) 456-7890",
      address: "Great Falls, Maryland",
      companyName: "Company A",
      orders: "2 Orders",
      amountSpent: "$25,000",
      emailSubscription: "Subscribed",
    },
    // Additional client data...
  ]);

  const handleAddClient = (newClient) => {
    setClients([...clients, { ...newClient, id: clients.length + 1 }]);
  };

  const handleEditClient = (id) => {
    console.log(`Edit client with ID: ${id}`);
    // Implement client edit functionality here
  };

  const handleDeleteClient = (id) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  return (
    <div>
      <h1>Clients</h1>
      <ClientAdd onAddClient={handleAddClient} />
      <ClientList
        rowData={clients}
        onEditClient={handleEditClient}
        onDeleteClient={handleDeleteClient}
      />
    </div>
  );
};

export default Clients;
