import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../assets/css/OrderList.css";

function OrderList({
    orders,
    filteredOrders,
    handleEdit,
    handleDelete,
    searchTerm,
    handleSearch,
    pendingOrdersCount,
    cancelledOrdersCount,
    deliveredOrdersCount,
    handleOpenForm,
}) {

  return (
    <>
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
          </div>
          <button className="create-btn" onClick={handleOpenForm}>
            Create Order
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
                  <td>
                    <span className={`status-indicator ${order.payment.toLowerCase()}`}></span>
                    {order.payment}
                  </td>
                  <td>{order.date}</td>
                  <td>{order.client}</td>
                  <td>{order.venue}</td>
                  <td>{order.courier}</td>
                  <td>
                    <span className={`status-indicator ${order.status.toLowerCase()}`}></span>
                    {order.status}
                  </td>
                  <td>{order.transport}</td>
                  <td>
                    <FaEdit
                      className="icon edit-icon"
                      onClick={() => handleEdit(order)}
                    />
                    <FaTrash
                      className="icon delete-icon"
                      onClick={() => handleDelete(order.id)}
                    />
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
      </div>  
    </>
  );
}

export default OrderList;
