import React, { useState, useEffect } from "react";

const vehicleTypes = [
  { value: "", label: "Select Vehicle" }, 
  { value: "Tank", label: "Tank" },
  { value: "Tank_wagon", label: "Tank Wagon" },
  { value: "Truck", label: "Truck" },
  { value: "Semi Truck", label: "Semi Truck" },
];

const statusTypes = [
  { value: "", label: "Select Status" },
  { value: "Available", label: "Available" },
  { value: "In Use", label: "In Use" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Out Of Service", label: "Out of Service" },
];

const TransportForm = ({ addTransport, editingTransport, updateTransport }) => {
  const [transport, setTransport] = useState({
    name: "",
    vehicleType: "", 
    status: "", 
    capacity: "",
    description: "",
  });

  useEffect(() => {
    if (editingTransport) {
      setTransport(editingTransport);
    }
  }, [editingTransport]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransport({ ...transport, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transport.vehicleType || !transport.status) {
      alert("Please select a vehicle type and status.");
      return;
    }

    if (editingTransport) {
      updateTransport(transport);
    } else {
      addTransport(transport);
    }

    setTransport({
      name: "",
      vehicleType: "",
      status: "",
      capacity: "",
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="transport-form">
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={transport.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
      </div>

      <div>
        <label>Vehicle Type</label>
        <select
          name="vehicleType"
          value={transport.vehicleType}
          onChange={handleInputChange}
        >
          {vehicleTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Status</label>
        <select
          name="status"
          value={transport.status}
          onChange={handleInputChange}
        >
          {statusTypes.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Capacity</label>
        <input
          type="number"
          name="capacity"
          value={transport.capacity}
          onChange={handleInputChange}
          placeholder="Capacity"
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={transport.description}
          onChange={handleInputChange}
          placeholder="Description"
        ></textarea>
      </div>

      <button type="submit">{editingTransport ? "Update Transport" : "Add Transport"}</button>
    </form>
  );
};

export default TransportForm;
