import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import VenueForm from "./VenueForm";
import VenueList from "./VenueList";
import VenueView from "./VenueView";
import '../../assets/css/Venue.css';
import {
  GET_ALL_VENUES,
} from "../../graphql/queries/VenueQueries";
import {
  CREATE_VENUE,
  EDIT_VENUE,
  DELETE_VENUE,
} from "../../graphql/mutation/VenueMutation";

const Venue = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingVenue, setEditingVenue] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewingVenueId, setViewingVenueId] = useState(null);
  const [clientId, setClientId] = useState("YOUR_CLIENT_ID"); // Set this dynamically if needed

  const { loading, error, data, refetch } = useQuery(GET_ALL_VENUES, {
    variables: { clientId },
    onError: (err) => console.error("Query Error:", err),
  });

  const [createVenue] = useMutation(CREATE_VENUE, {
    onError: (err) => console.error("Create Mutation Error:", err),
    onCompleted: () => {
      refetch();
    },
  });

  const [editVenue] = useMutation(EDIT_VENUE, {
    onError: (err) => console.error("Edit Mutation Error:", err),
    onCompleted: () => {
      refetch();
    },
  });

  const [deleteVenue] = useMutation(DELETE_VENUE, {
    onError: (err) => console.error("Delete Mutation Error:", err),
    onCompleted: () => refetch(),
  });

  const addVenue = async (venue) => {
    try {
      await createVenue({ variables: { clientId, name: venue.name } });
    } catch (err) {
      console.error("Error creating venue:", err);
      alert("An error occurred while creating the venue.");
    }
  };

  const handleUpdate = async (venue) => {
    try {
      await editVenue({ variables: { clientId, venueId: venue.id, name: venue.name } });
    } catch (err) {
      console.error("Error updating venue:", err);
      alert("An error occurred while updating the venue.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;

    try {
      await deleteVenue({ variables: { clientId, venueId: id } });
    } catch (err) {
      console.error("Error deleting venue:", err);
      alert("An error occurred while deleting the venue.");
    }
  };

  const handleView = (venue) => {
    setViewingVenueId(venue.id);
  };

  const handleEdit = (venue) => {
    setEditingVenue(venue);
    setIsFormVisible(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredVenues = data
    ? data.getVenuesByClientId.filter((venue) =>
        venue.name.toLowerCase().includes(searchTerm)
      )
    : [];

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>Error loading venues: {error.message}</p>;

  return (
    <div className="venue-container">
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
            setEditingVenue(null);
          }}
        >
          Add Venue
        </button>
      </div>

      {isFormVisible && (
        <VenueForm
          addVenue={addVenue}
          editingVenue={editingVenue}
          updateVenue={handleUpdate}
          onClose={() => setIsFormVisible(false)}
        />
      )}

      <VenueList
        venues={filteredVenues}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {viewingVenueId && (
        <VenueView
          clientId={clientId} // Pass clientId to VenueView
          venueId={viewingVenueId}
          onClose={() => setViewingVenueId(null)}
        />
      )}
    </div>
  );
};

export default Venue;
