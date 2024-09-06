import React, { useState } from "react";

const defaultProfileImage = "https://via.placeholder.com/150"; // Replace with your default image path

const CourierForm = ({ addCourier }) => {
  const [courier, setCourier] = useState({
    firstName: "",
    email: "",
    address: "",
    transport: "",
    bio: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourier({ ...courier, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourier({ ...courier, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourier(courier);
    setCourier({
      firstName: "",
      email: "",
      address: "",
      transport: "",
      bio: "",
      image: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="courier-form">
      <div>
        <label htmlFor="image">
          {courier.image ? (
            <img src={courier.image} alt="Profile" width="100" height="100" />
          ) : (
            <img src={defaultProfileImage} alt="Default Icon" width="100" height="100" />
          )}
        </label>
        <input type="file" id="image" onChange={handleImageChange} />
      </div>

      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={courier.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={courier.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
      </div>

      <div>
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={courier.address}
          onChange={handleInputChange}
          placeholder="Address"
        />
      </div>

      <div>
        <label>Transport</label>
        <input
          type="text"
          name="transport"
          value={courier.transport}
          onChange={handleInputChange}
          placeholder="Transport"
        />
      </div>

      <div>
        <label>Bio</label>
        <textarea
          name="bio"
          value={courier.bio}
          onChange={handleInputChange}
          placeholder="Brief bio"
        ></textarea>
      </div>

      <button type="submit">Add Courier</button>
    </form>
  );
};

export default CourierForm;
