import React, { useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaCalendarAlt, FaTimesCircle, FaStickyNote } from 'react-icons/fa';
import "../../assets/css/ClientAdd.css";

function ClientAdd({ isEditing, newClient, handleInputChange, handleSubmit, handleCloseForm, showCloseButton }) {
    useEffect(() => {
        if (!isEditing && !newClient.dateAdded) {
            const now = new Date();
            const formattedDate = now.toISOString().split('T')[0];
            const formattedTime = now.toTimeString().split(' ')[0];
            const dateTime = `${formattedDate} ${formattedTime}`;
            handleInputChange({ target: { name: 'dateAdded', value: dateTime } });
        }
    }, [isEditing, newClient.dateAdded, handleInputChange]);

    return (
        <>
            <div className="client-form-container">
                <h2>{isEditing ? "Edit Client" : "Add Client"}</h2>
                <form className="client-form" onSubmit={handleSubmit}>

                    {/* Name Group */}
                    <div className="form-group">
                        <FaUser className="form-icon" />
                        <label>
                            Full Name
                            <div className="name-group">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={newClient.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={newClient.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </label>
                    </div>

                    {/* Job, Company, and Phone Group */}
                    <div className="job-company-phone-group">
                        <div className="form-group">
                            <FaBuilding className="form-icon" />
                            <label>
                                Company Name
                                <select
                                    name="companyName"
                                    value={newClient.companyName}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Company</option>
                                    <option value="FuelCorp">FuelCorp</option>
                                    <option value="PetroMatic">PetroMatic</option>
                                    <option value="Gasoline Group">Gasoline Group</option>
                                    <option value="Energy Solutions">Energy Solutions</option>
                                </select>
                            </label>
                        </div>

                        <div className="form-group">
                            <FaUser className="form-icon" />
                            <label>
                                Job Role
                                <select
                                    name="jobRole"
                                    value={newClient.jobRole}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Job Role</option>
                                    <option value="Field Engineer">Field Engineer</option>
                                    <option value="Safety Officer">Safety Officer</option>
                                    <option value="Supply Chain Manager">Supply Chain Manager</option>
                                    <option value="Fuel Technician">Fuel Technician</option>
                                </select>
                            </label>
                        </div>

                        <div className="form-group">
                            <FaPhone className="form-icon" />
                            <label>
                                Phone
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone"
                                    value={newClient.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>
                    </div>

                    {/* Email and Status Group */}
                    <div className="email-form">
                        <div className="form-group">
                            <FaEnvelope className="form-icon" />
                            <label>
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={newClient.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <FaTimesCircle className="form-icon" />
                            <label>
                                Status
                                <select
                                    name="status"
                                    value={newClient.status}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    {/* Address Group */}
                    <div className="form-group">
                        <FaMapMarkerAlt className="form-icon" />
                        <label>
                            Address
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={newClient.address}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    {/* City, ZIP, and State Group */}
                    <div className="form-group">
                        <FaMapMarkerAlt className="form-icon" />
                        <label>
                            City
                            <div className="address-group">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={newClient.city}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span>ZIP</span>
                                <input
                                    type="text"
                                    name="zip"
                                    placeholder="ZIP"
                                    value={newClient.zip}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span>State</span>
                                <select
                                    name="state"
                                    value={newClient.state}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Choose State</option>
                                    <option value="state1">State 1</option>
                                    <option value="state2">State 2</option>
                                    <option value="state3">State 3</option>
                                </select>
                            </div>
                        </label>
                    </div>

                    {/* Bio */}
                    <div className="form-group">
                        <FaStickyNote className="form-icon" />
                        <label>
                            Bio
                            <textarea
                                name="bio"
                                placeholder="Bio"
                                value={newClient.bio}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="btn">
                        <button type="submit" className="submit-btn">
                            {isEditing ? "Update Client" : "Add Client"}
                        </button>
                        {showCloseButton && (
                            <button type="button" className="close-form-btn" onClick={handleCloseForm}>Close Form</button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}

export default ClientAdd;
