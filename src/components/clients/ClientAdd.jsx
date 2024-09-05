import React, { useState } from "react";
import '../../assets/css/ClientAdd.css';


const ClientAdd = ({ onAddClient }) => {
  const [client, setClient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
    orders: "",
    amountSpent: "",
    emailSubscription: "Subscribed", // Default value
  });

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddClient(client);
    setClient({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      companyName: "",
      orders: "",
      amountSpent: "",
      emailSubscription: "Subscribed",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={client.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={client.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        value={client.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="tel"
        name="phone"
        value={client.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <input
        type="text"
        name="address"
        value={client.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      <input
        type="text"
        name="companyName"
        value={client.companyName}
        onChange={handleChange}
        placeholder="Company Name"
        required
      />
      <input
        type="text"
        name="orders"
        value={client.orders}
        onChange={handleChange}
        placeholder="Orders"
        required
      />
      <input
        type="text"
        name="amountSpent"
        value={client.amountSpent}
        onChange={handleChange}
        placeholder="Amount Spent"
        required
      />
      <select
        name="emailSubscription"
        value={client.emailSubscription}
        onChange={handleChange}
      >
        <option value="Subscribed">Subscribed</option>
        <option value="Not subscribed">Not Subscribed</option>
        <option value="Pending">Pending</option>
      </select>
      <button type="submit">Add Client</button>
    </form>
  );
};

export default ClientAdd;
