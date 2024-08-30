import React, { useState } from "react";
import "../assets/css/Order.css"; 

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [newOrder, setNewOrder] = useState({
    product: "",
    customer: "",
    date: "",
    total: "",
    status: "",
    items: "",
    delivery: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newOrder.product && newOrder.customer && newOrder.date && newOrder.total && newOrder.status && newOrder.items && newOrder.delivery) {
      setOrders((prevOrders) => [...prevOrders, { ...newOrder, id: Date.now() }]);
      setNewOrder({
        product: "",
        customer: "",
        date: "",
        total: "",
        status: "",
        items: "",
        delivery: "",
      });
      setFormVisible(false);
    } else {
      alert("Please fill out all fields.");
    }
  };

  const fulfilledOrdersCount = orders.filter(order => order.status.toLowerCase() === 'fulfilled').length;
  const deliveredOrdersCount = orders.filter(order => order.delivery.toLowerCase() === 'delivered').length;

  return (
    <div className="orders-container">
      <div className="header">
        <h2>Orders</h2>
        <input
          type="text"
          placeholder="Search order..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => setFormVisible(!isFormVisible)}>
          {isFormVisible ? "Close Form" : "Create Order"}
        </button>
      </div>

      {isFormVisible && (
        <form className="order-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="product"
            placeholder="Product"
            value={newOrder.product}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="customer"
            placeholder="Customer"
            value={newOrder.customer}
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
            name="total"
            placeholder="Total"
            value={newOrder.total}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="status"
            placeholder="Payment Status"
            value={newOrder.status}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="items"
            placeholder="Items"
            value={newOrder.items}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="delivery"
            placeholder="Delivery Method"
            value={newOrder.delivery}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Order</button>
        </form>
      )}

      <div className="stats">
        <div>Total orders: {orders.length}</div>
        <div>
          Ordered items over time: {orders.reduce((acc, order) => acc + Number(order.items), 0)}
        </div>
        <div>Fulfilled orders over time: {fulfilledOrdersCount}</div>
        <div>Delivered orders over time: {deliveredOrdersCount}</div>
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Payment Status</th>
            <th>Items</th>
            <th>Delivery Method</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.product}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>${parseFloat(order.total).toFixed(2)}</td>
                <td>{order.status}</td>
                <td>{order.items}</td>
                <td>{order.delivery}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
