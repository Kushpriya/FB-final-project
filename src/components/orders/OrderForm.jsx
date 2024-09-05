import React, { useEffect } from 'react';
import { FaBox, FaUser, FaLocationArrow, FaCalendarAlt, FaHashtag, FaDollarSign, FaTruck, FaShippingFast, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import "../../assets/css/orders/OrderForm.css";

function OrderForm({ isEditing, newOrder, handleInputChange, handleSubmit, handleCloseForm, showCloseButton }) {
    useEffect(() => {
        if (!isEditing && !newOrder.date) {
            const now = new Date();
            const formattedDate = now.toISOString().split('T')[0]; 
            const formattedTime = now.toTimeString().split(' ')[0]; 
            const dateTime = `${formattedDate} ${formattedTime}`; 
            handleInputChange({ target: { name: 'date', value: dateTime } });
        }
    }, [isEditing, newOrder.date, handleInputChange]);

    return (
        <div className="order-form-container">
            <h2>{isEditing ? "Edit delivery Order" : "Create delivery Order"}</h2>
            <form className="order-form" onSubmit={handleSubmit}>
                <div className="order-form-group-inline">
                    <div className="order-form-group">
                        <label>
                            <FaBox className="order-form-icon" /> Merchandise
                        </label>
                        <input
                            type="text"
                            name="merchandise"
                            placeholder="Merchandise"
                            value={newOrder.merchandise}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="order-form-group">
                        <label>
                            <FaBox className="order-form-icon" /> Category
                        </label>
                        <select
                            name="category"
                            value={newOrder.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Category 1">Category 1</option>
                            <option value="Category 2">Category 2</option>
                        </select>
                    </div>
                </div>

                <div className="order-form-group-inline">
                    <div className="order-form-group order-form-large-client">
                        <label>
                            <FaUser className="order-form-icon" /> Client
                        </label>
                        <input
                            type="text"
                            name="client"
                            placeholder="Client"
                            value={newOrder.client}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="order-form-group">
                        <label>
                            <FaLocationArrow className="order-form-icon" /> Venue
                        </label>
                        <input
                            type="text"
                            name="venue"
                            placeholder="Venue"
                            value={newOrder.venue}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="order-form-group-inline">
                    <div className="order-form-group">
                        <label>
                            <FaCalendarAlt className="order-form-icon" /> Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            placeholder="Date"
                            value={newOrder.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="order-form-group">
                        <label>
                            <FaHashtag className="order-form-icon" /> Quantity
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={newOrder.quantity}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="order-form-group">
                        <label>
                            <FaDollarSign className="order-form-icon" /> Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={newOrder.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="order-form-group-inline">
                    <div className="order-form-group">
                        <label>
                            <FaTruck className="order-form-icon" /> Courier
                        </label>
                        <select
                            name="courier"
                            value={newOrder.courier}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Courier</option>
                            <option value="Courier 1">Courier 1</option>
                            <option value="Courier 2">Courier 2</option>
                        </select>
                    </div>
                    <div className="order-form-group">
                        <label>
                            <FaShippingFast className="order-form-icon" /> Transport
                        </label>
                        <select
                            name="transport"
                            value={newOrder.transport}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Transport</option>
                            <option value="Truck A">Truck A</option>
                            <option value="Truck B">Truck B</option>
                            <option value="Van C">Van C</option>
                        </select>
                    </div>
                </div>

                <div className="order-form-group-inline">
                    <div className="order-form-group">
                        <label>
                            <FaCheckCircle className="order-form-icon" /> Status
                        </label>
                        <select
                            name="status"
                            value={newOrder.status}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Pending">Pending</option>
                        </select>
                    </div>

                    <div className="order-form-group">
                        <label>
                            <FaTimesCircle className="order-form-icon" /> Payment
                        </label>
                        <select
                            name="payment"
                            value={newOrder.payment}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Pending">Pending</option>
                            <option value="Success">Success</option>
                        </select>
                    </div>
                </div>

                <div className='order-form-btn'>
                    <button type="submit" className="order-form-submit-btn">
                            {isEditing ? "Update Order" : "Add Order"}
                    </button>

                    {showCloseButton && (
                        <button className="order-form-close-btn" onClick={handleCloseForm}>Close Form</button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default OrderForm;
