import React, { useState } from 'react';
import OrderGroupList from './OrderGroupList';
import '../../assets/css/OrderGroup.css';

const OrderGroup = () => {
  const [selectedOrder, setSelectedOrder] = useState('OrderGroup');

  const handleSelection = (event) => {
    setSelectedOrder(event.target.value);
  };
  

  return (
    <div className="order-group-container">
      <h2 className='order-header'>Select Order Type</h2>
      <div className="dropdown-container">
        <select value={selectedOrder} onChange={handleSelection} className="order-dropdown">
          <option value="OrderGroup">Order Group List</option>
          <option value="RecurringOrder">Recurring Order</option>
          <option value="NonRecurringOrder">Non-Recurring Order</option>
        </select>
      </div>
      {selectedOrder === 'OrderGroup' && <h2>All Orders</h2>}
      {selectedOrder === 'RecurringOrder' && <h2>Recurring Orders</h2>}
      {selectedOrder === 'NonRecurringOrder' && <h2>Non-Recurring Orders</h2>}

      {selectedOrder === 'OrderGroup' && <OrderGroupList />}
      {selectedOrder === 'RecurringOrder' && <OrderGroupList filterRecurring={true} />}
      {selectedOrder === 'NonRecurringOrder' && <OrderGroupList filterRecurring={false} />}
    </div>
  );
};

export default OrderGroup;
