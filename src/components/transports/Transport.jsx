import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import TransportForm from "./TransportForm";
import TransportList from "./TransportList";
import '../../assets/css/transports/Transports.css';
import {
  GET_ALL_TRANSPORTS_QUERY,
  GET_TRANSPORTS_BY_VEHICLE_TYPE_QUERY,
} from "../../graphql/queries/TransportQueries";
import {
  CREATE_TRANSPORT,
  UPDATE_TRANSPORT,
  DELETE_TRANSPORT,
} from "../../graphql/mutation/TransportMutation";
import Slider from "../Slider";

const Transport = () => {
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTransport, setEditingTransport] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { loading, error, data, refetch } = useQuery(
    vehicleTypeFilter ? GET_TRANSPORTS_BY_VEHICLE_TYPE_QUERY : GET_ALL_TRANSPORTS_QUERY,
    {
      variables: { vehicleType: vehicleTypeFilter },
      skip: !vehicleTypeFilter,
      onError: (err) => console.error("Query Error:", err),
    }
  );

  const [createTransport] = useMutation(CREATE_TRANSPORT, {
    onError: (err) => console.error("Create Mutation Error:", err),
  });

  const [updateTransport] = useMutation(UPDATE_TRANSPORT, {
    onError: (err) => console.error("Update Mutation Error:", err),
  });

  const [deleteTransport] = useMutation(DELETE_TRANSPORT, {
    onError: (err) => console.error("Delete Mutation Error:", err),
  });

  const addTransport = async (transport) => {
    try {
      const { data } = await createTransport({
        variables: {
          transportInfo: {
            name: transport.name,
            status: transport.status,
            vehicleType: transport.vehicleType,
          },
        },
      });

      if (data.createTransport.errors && data.createTransport.errors.length > 0) {
        alert(`Error: ${data.createTransport.errors.join(", ")}`);
      } else {
        alert(data.createTransport.message || "Transport created successfully!");
        refetch();
        setIsFormVisible(false);
      }
    } catch (err) {
      console.error("Error creating transport:", err);
      alert("An error occurred while creating the transport.");
    }
  };

  const handleUpdate = async (transport) => {
    try {
      const { data } = await updateTransport({
        variables: {
          transportId: transport.id,
          transportInfo: {
            name: transport.name,
            vehicleType: transport.vehicleType,
            status: transport.status,
          },
        },
      });

      if (data.updateTransport.errors && data.updateTransport.errors.length > 0) {
        alert(`Error: ${data.updateTransport.errors.join(", ")}`);
      } else {
        alert(data.updateTransport.message || "Transport updated successfully!");
        refetch();
        setEditingTransport(null);
        setIsFormVisible(false);
      }
    } catch (err) {
      console.error("Error updating transport:", err);
      alert("An error occurred while updating the transport.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transport?")) return;

    try {
      const { data } = await deleteTransport({
        variables: { transportId: id },
      });

      if (data.deleteTransport.errors && data.deleteTransport.errors.length > 0) {
        alert(`Error: ${data.deleteTransport.errors.join(", ")}`);
      } else {
        alert(data.deleteTransport.message || "Transport deleted successfully!");
        refetch();
      }
    } catch (err) {
      console.error("Error deleting transport:", err);
      alert("An error occurred while deleting the transport.");
    }
  };

  const handleView = (transport) => {
    alert(`Viewing transport: \n${JSON.stringify(transport, null, 2)}`);
  };

  const handleEdit = (transport) => {
    setEditingTransport(transport);
    setIsFormVisible(true);
  };

  const handleVehicleTypeChange = (e) => {
    setVehicleTypeFilter(e.target.value);
    refetch();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredTransports = data
    ? (vehicleTypeFilter
      ? data.getAllTransportByVehicleType
      : data.getAllTransports
    )?.filter((transport) =>
      transport.vehicleType.toLowerCase().includes(searchTerm) ||
      transport.status.toLowerCase().includes(searchTerm)
    )
    : [];

  if (loading) return <p>Loading transports...</p>;
  if (error) return <p>Error loading transports: {error.message}</p>;

  return (
    <>
    <Slider/>
    <div className="transport-container">
      <div className="filter-section">
        <button
          onClick={() => {
            setIsFormVisible(true);
            setEditingTransport(null);
          }}
        >
          Add Transport
        </button>
        <label>Filter by Vehicle Type: </label>
        <select onChange={handleVehicleTypeChange} value={vehicleTypeFilter}>
          <option value="">All Vehicles</option>
          <option value="Tank">Tank</option>
          <option value="Tank_wagon">Tank Wagon</option>
          <option value="Truck">Truck</option>
          <option value="Semi Truck">Semi Truck</option>
        </select>

        <input
          type="text"
          placeholder="Search by vehicle type or status..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />

        <div className="total-transports">
          Total Transports: {filteredTransports.length}
        </div>
      </div>

      {isFormVisible && (
        <TransportForm
          addTransport={addTransport}
          editingTransport={editingTransport}
          updateTransport={handleUpdate}
          onClose={() => setIsFormVisible(false)}
        />
      )}

      <TransportList
        transports={filteredTransports}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
    </>
  );
};

export default Transport;
