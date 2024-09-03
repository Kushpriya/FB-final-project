import React, { useEffect } from 'react';
import { FaBox, FaUser, FaLocationArrow, FaCalendarAlt, FaHashtag, FaDollarSign, FaTruck, FaShippingFast, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import "../../assets/css/OrderForm.css";
import Slider from '../../components/Slider';

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
        <>
            <Slider />
            <div className="order-form-container">
                <h2>{isEditing ? "Edit Order" : "Create Order"}</h2>
                <form className="order-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            <FaBox className="form-icon" /> Merchandise
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

                        <div className="form-group">
                            <label>
                                <FaUser className="form-icon" /> Client
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
                        <div className="form-group-inline">
                        <div className="form-group">
                            <label>
                                <FaLocationArrow className="form-icon" /> Venue
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

                        <div className="form-group">
                            <label>
                                <FaCalendarAlt className="form-icon" /> Date
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
                        </div>

                        <div className="form-group-inline">
                        <div className="form-group">
                            <label>
                                <FaHashtag className="form-icon" /> Quantity
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

                        <div className="form-group">
                            <label>
                                <FaDollarSign className="form-icon" /> Price
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
                        <div className="form-group-inline">
                        <div className="form-group">
                            <label>
                                <FaTruck className="form-icon" /> Courier
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

                        <div className="form-group">
                            <label>
                                <FaShippingFast className="form-icon" /> Transport
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
                        <div className="form-group-inline">
                        <div className="form-group">
                            <label>
                                <FaCheckCircle className="form-icon" /> Status
                            </label>
                            <select
                                name="status"
                                value={newOrder.status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                    <div className="form-group">
                        <label>
                            <FaTimesCircle className="form-icon" /> Payment
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

                    <div className='btn'>
                    <button type="submit" className="submit-btn">
                        {isEditing ? "Update Order" : "Add Order"}
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

export default OrderForm;
