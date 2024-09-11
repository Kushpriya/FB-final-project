import React, { useEffect } from 'react';
import { FaBox, FaUser, FaTags, FaHashtag, FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import "../../assets/css/MerchandiseForm.css";

function MerchandiseForm({ isEditing, newMerchandise, handleInputChange, handleSubmit, handleCloseForm, showCloseButton }) {
    useEffect(() => {
        if (!isEditing && !newMerchandise.dateAdded) {
            const now = new Date();
            const formattedDate = now.toISOString().split('T')[0]; 
            const formattedTime = now.toTimeString().split(' ')[0]; 
            const dateTime = `${formattedDate} ${formattedTime}`; 
            handleInputChange({ target: { name: 'dateAdded', value: dateTime } });
        }
    }, [isEditing, newMerchandise.dateAdded, handleInputChange]);

    return (
        <>
            <div className="merchandise-form-wrapper">
                <h2>{isEditing ? "Edit Merchandise" : "Create Merchandise"}</h2>
                <form className="merchandise-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>
                            <FaBox className="input-icon" /> Merchandise Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="merchandise-form-input"
                            placeholder="Merchandise Name"
                            value={newMerchandise.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label>
                                <FaTags className="input-icon" /> Category
                            </label>
                            <select
                                name="category"
                                className="merchandise-form-select"
                                value={newMerchandise.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Books">Books</option>
                                <option value="Beauty">Beauty</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label>
                                <FaHashtag className="input-icon" /> Quantity
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                className="merchandise-form-input"
                                placeholder="Quantity"
                                value={newMerchandise.quantity}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label>
                                <FaDollarSign className="input-icon" /> Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                className="merchandise-form-input"
                                placeholder="Price"
                                value={newMerchandise.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>
                                <FaCheckCircle className="input-icon" /> Status
                            </label>
                            <select
                                name="status"
                                className="merchandise-form-select"
                                value={newMerchandise.status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Available">Available</option>
                                <option value="OutofStock">Out of Stock</option>
                                <option value="Discontinued">Discontinued</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>
                            <FaUser className="input-icon" /> Description
                        </label>
                        <textarea
                            name="description"
                            className="merchandise-form-textarea"
                            placeholder="Description"
                            value={newMerchandise.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="btn-submit">
                            {isEditing ? "Update Merchandise" : "Add Merchandise"}
                        </button>

                        {showCloseButton && (
                            <button className="btn-close" onClick={handleCloseForm}>Close Form</button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}

export default MerchandiseForm;
