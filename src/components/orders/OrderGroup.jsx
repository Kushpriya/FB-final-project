import React, { useState } from 'react';
import OrderGroupList from './OrderGroupList';
import RecurringOrder from './RecurringOrder';
import NonRecurringOrderGroup from './NonRecurringOrder';
import MainRecurringOrder from './MainRecurringOrder';
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
          <option value="MainRecurringOrder">Main Recurring Order</option>
        </select>
      </div>

      {selectedOrder === 'OrderGroup' && <OrderGroupList />}
      {selectedOrder === 'RecurringOrder' && <RecurringOrder />}
      {selectedOrder === 'NonRecurringOrder' && <NonRecurringOrderGroup />}
      {selectedOrder === 'MainRecurringOrder' && <MainRecurringOrder />}
    </div>
  );
};

export default OrderGroup;
