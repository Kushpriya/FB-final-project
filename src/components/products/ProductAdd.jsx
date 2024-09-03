import React, { useEffect } from 'react';
import { FaBox, FaUser, FaTags, FaHashtag, FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import "../../assets/css/ProductAdd.css";

function ProductForm({ isEditing, newProduct, handleInputChange, handleSubmit, handleCloseForm, showCloseButton }) {
    useEffect(() => {
        if (!isEditing && !newProduct.dateAdded) {
            const now = new Date();
            const formattedDate = now.toISOString().split('T')[0]; 
            const formattedTime = now.toTimeString().split(' ')[0]; 
            const dateTime = `${formattedDate} ${formattedTime}`; 
            handleInputChange({ target: { name: 'dateAdded', value: dateTime } });
        }
    }, [isEditing, newProduct.dateAdded, handleInputChange]);

    return (
        <>
            <div className="product-form-container">
                <h2>{isEditing ? "Edit Product" : "Create Product"}</h2>
                <form className="product-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            <FaBox className="form-icon" /> Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                <div className="form-group-inline">
                        <div className="form-group">
                            <label>
                                <FaTags className="form-icon" /> Category
                            </label>
                            <select
                                name="category"
                                value={newProduct.category}
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

                    <div className="form-group">
                        <label>
                            <FaHashtag className="form-icon" /> Quantity
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={newProduct.quantity}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    </div>
                    <div className="form-group-inline">

                    <div className="form-group">
                        <label>
                            <FaDollarSign className="form-icon" /> Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label>
                            <FaCheckCircle className="form-icon" /> Status
                        </label>
                        <select
                            name="status"
                            value={newProduct.status}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="Available">Available</option>
                            <option value="OutofStock">OutofStock</option>
                            <option value="Discontinued">Discontinued</option>
                        </select>
                    </div>
                    </div>

                    <div className="form-group">
                        <label>
                            <FaUser className="form-icon" /> Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='btn'>
                    <button type="submit" className="submit-btn">
                        {isEditing ? "Update Product" : "Add Product"}
                    </button>

                    {showCloseButton && (
                    <button className="close-form-btn" onClick={handleCloseForm}>Close Form</button>
                )}
                </div>
                </form>

               

            </div>
        </>
    );
}

export default ProductForm;
