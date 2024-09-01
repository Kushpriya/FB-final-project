import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/css/OrderForm.css';
import '../../assets/css/OrderList.css';
import Slider from '../../components/Slider';
import OrderForm from './OrderForm';
import OrderList from './OrderList';

function Orders() {
  const [orders, setOrders] = useState([]);
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
  const [formVisible, setFormVisible] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false); // New state

  const location = useLocation();
  const navigate = useNavigate();

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
      navigate('/orders/orderlist'); // Redirect to Order List after submission
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleEdit = (order) => {
    setIsEditing(true);
    setEditingOrderId(order.id);
    setNewOrder(order);
    navigate('/orders/orderform'); // Navigate to Order Form for editing
  };

  const handleDelete = (orderId) => {
    const confirmed = window.confirm("Are you sure you want to delete this order?");
    if (confirmed) {
      setOrders(orders.filter((order) => order.id !== orderId));
    }
  };

  const handleOpenForm = () => {
    setFormVisible(true);
    setShowCloseButton(true); // Show close button
    navigate('/orders/orderform'); // Navigate to Order Form
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setShowCloseButton(false); // Hide close button
    navigate('/orders/orderlist'); // Navigate to Order List
  };

  return (
    <>
      <Slider />
      <div className="orders-container">
        <div className="orders-content">
          {location.pathname === '/orders/orderform' && (
            <OrderForm
              newOrder={newOrder}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isEditing={isEditing}
              handleCloseForm={handleCloseForm}
              showCloseButton={showCloseButton} // Pass showCloseButton
            />
          )}
          {location.pathname === '/orders/orderlist' && (
            <OrderList
              orders={orders}
              filteredOrders={filteredOrders}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleSearch={handleSearch}
              searchTerm={searchTerm}
              pendingOrdersCount={orders.filter(order => order.status === 'Pending').length}
              cancelledOrdersCount={orders.filter(order => order.status === 'Cancelled').length}
              deliveredOrdersCount={orders.filter(order => order.status === 'Delivered').length}
              handleOpenForm={handleOpenForm} // Pass handleOpenForm
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Orders;
