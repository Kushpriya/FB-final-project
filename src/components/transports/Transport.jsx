import React, { useState } from "react";
import TransportForm from "./TransportForm";
import TransportList from "./TransportList";
import '../../assets/css/transports/Transports.css';

const Transport = () => {
  const [transports, setTransports] = useState([]);
  const [editingTransport, setEditingTransport] = useState(null);

  const addTransport = (transport) => {
    setTransports([...transports, transport]);
  };

  const handleView = (transport) => {
    alert(`Viewing transport: \n${JSON.stringify(transport, null, 2)}`);
  };

  const handleEdit = (transport) => {
    setEditingTransport(transport);
  };

  const handleUpdate = (updatedTransport) => {
    const updatedList = transports.map((t) =>
      t.name === updatedTransport.name ? updatedTransport : t
    );
    setTransports(updatedList);
    setEditingTransport(null);
  };

  const handleDelete = (transport) => {
    const updatedList = transports.filter((t) => t.name !== transport.name);
    setTransports(updatedList);
  };

  return (
    <div>
      <TransportForm
        addTransport={addTransport}
        editingTransport={editingTransport}
        updateTransport={handleUpdate}
      />
      <TransportList
        transports={transports}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Transport;
