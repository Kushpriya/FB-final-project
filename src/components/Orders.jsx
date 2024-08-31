import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import "../assets/css/Order.css"; 

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [newOrder, setNewOrder] = useState({
    id: "",
    client: "",
    venue: "",
    merchandise: "",
    quantity: 1,
    price: "",
    date: "",
    total: "", 
    courier: "",
    transport: "",
    status: "",
    payment: "Pending", 

  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.merchandise.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => {
      const updatedOrder = { ...prevOrder, [name]: value };

      if (name === "quantity" || name === "price") {
        const quantity = name === "quantity" ? value : updatedOrder.quantity;
        const price = name === "price" ? value : updatedOrder.price;
        updatedOrder.total = quantity * price;
      }

      return updatedOrder;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      newOrder.client &&
      newOrder.venue &&
      newOrder.merchandise &&
      newOrder.quantity > 0 &&
      newOrder.price > 0 &&
      newOrder.date &&
      newOrder.courier &&
      newOrder.transport &&
      newOrder.status &&
      newOrder.payment
    ) {
      if (isEditing) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === editingOrderId ? { ...newOrder, id: editingOrderId } : order
          )
        );
        setIsEditing(false);
        setEditingOrderId(null);
      } else {
        const newId = orders.length + 1;
        setOrders((prevOrders) => [
          ...prevOrders,
          { ...newOrder, id: newId },
        ]);
      }

      setNewOrder({
        id: "",
        client: "",
        venue: "",
        merchandise: "",
        quantity: 1,
        price: "",
        date: "",
        total: "",
        courier: "",
        transport: "",
        status: "",
        payment: "Pending",
      });
      setFormVisible(false);
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleEdit = (order) => {
    setIsEditing(true);
    setEditingOrderId(order.id);
    setNewOrder(order);
    setFormVisible(true);
  };

  const handleDelete = (orderId) => {
    const confirmed = window.confirm("Are you sure you want to delete this order?");
    if (confirmed) {
      setOrders(orders.filter((order) => order.id !== orderId));
    }
  };

  const pendingOrdersCount = orders.filter(
    (order) => order.status.toLowerCase() === "pending"
  ).length;
  const cancelledOrdersCount = orders.filter(
    (order) => order.status.toLowerCase() === "cancelled"
  ).length;
  const deliveredOrdersCount = orders.filter(
    (order) => order.status.toLowerCase() === "delivered"
  ).length;

  return (
    <div className="orders-container">
      <div className="header">
        <h2>Orders</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search order..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="icon search-icon" />
        </div>
        <button onClick={() => setFormVisible(!isFormVisible)}>
          {isFormVisible ? "Close Form" : "Create Order"}
        </button>
      </div>

      <div className="stats">
        <div>Total orders: {orders.length}</div>
        <div>
          Ordered quantity over time:{" "}
          {orders.reduce((acc, order) => acc + Number(order.quantity), 0)}
        </div>
        <div>Pending orders over time: {pendingOrdersCount}</div>
        <div>Cancelled orders over time: {cancelledOrdersCount}</div>
        <div>Delivered orders over time: {deliveredOrdersCount}</div>
      </div>

      {isFormVisible && (
        <form className="order-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="merchandise"
            placeholder="Merchandise"
            value={newOrder.merchandise}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="client"
            placeholder="Client"
            value={newOrder.client}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={newOrder.venue}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={newOrder.date}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newOrder.quantity}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newOrder.price}
            onChange={handleInputChange}
            required
          />
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
          <select
            name="payment"
            value={newOrder.payment}
            onChange={handleInputChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Success">Success</option>
          </select>
          <button type="submit">{isEditing ? "Update Order" : "Add Order"}</button>
        </form>
      )}

      {!isFormVisible && (
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Merchandise</th>
              <th>Quantity</th>
              <th>Price (unit)</th>
              <th>Total ($)</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Client</th>
              <th>Venue</th>
              <th>Courier</th>
              <th>Status</th>
              <th>Transport</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.merchandise}</td>
                  <td>{order.quantity}</td>
                  <td>${parseFloat(order.price).toFixed(2)}</td>
                  <td>${parseFloat(order.total).toFixed(2)}</td>
                  <td>{order.payment}</td>
                  <td>{order.date}</td>
                  <td>{order.client}</td>
                  <td>{order.venue}</td>
                  <td>{order.courier}</td>
                  <td>{order.status}</td>
                  <td>{order.transport}</td>
                  <td>
                    <FaEdit className="icon edit-icon" onClick={() => handleEdit(order.id)} />
                    <FaTrash className="icon delete-icon" onClick={() => handleDelete(order.id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
