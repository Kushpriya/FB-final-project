import React, { useState } from "react";
import TransportForm from "../../components/transports/TransportForm";
import TransportList from "../../components/transports/TransportList";
import '../../assets/css/transports/Transports.css';

const Transport = () => {
  const [transports, setTransports] = useState([]);

  const addTransport = (transport) => {
    setTransports([...transports, transport]);
  };

  return (
    <div>
      <TransportForm addTransport={addTransport} />
      <TransportList transports={transports} />
    </div>
  );
};

export default Transport;