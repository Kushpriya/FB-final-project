import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { FaEye} from 'react-icons/fa';
import { GET_CHILDREN_RECURRING_ORDERS } from '../../graphql/OrderGroupQueries';
import './style.css';
import { useParams } from 'react-router-dom';

const flattenChildrenRecurringOrderData = (orders) => {
  return orders.map(order => ({
    id: order.id,
    mainOrderGroupId: order.mainOrderGroupId,
    startOn: order.startOn,
    completedOn: order.completedOn,
    status: order.status,
    clientId: order.clientId || 'N/A',
    clientName: order.client?.name || 'N/A',
    clientEmail: order.client?.email || 'N/A',
    deliverySource: order.deliveryOrder?.source || 'N/A',
    vehicleType: order.deliveryOrder?.vehicleType || 'N/A',
    lineItemQuantity: order.deliveryOrder?.lineItems[0]?.quantity || 'N/A',
    lineItemUnit: order.deliveryOrder?.lineItems[0]?.unit || 'N/A',
    price: order.deliveryOrder?.lineItems[0]?.price || 'N/A',
    tenantId: order.tenantId || 'N/A',
    venueId: order.venueId || 'N/A',
  }));
};

const ChildrenRecurringOrder = () => {
  const { mainRecurringOrderId } = useParams(); 
  const { loading, error, data } = useQuery(GET_CHILDREN_RECURRING_ORDERS, {
    variables: { mainRecurringOrderId },
  });

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order); 
  };

  const closeModal = () => {
    setSelectedOrder(null); 
  };

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Start On', field: 'startOn' },
    { headerName: 'Status', field: 'status', cellRenderer: params => (
      <span style={{ color: params.value === 'delivered' ? 'green' : params.value === 'cancelled' ? 'red' : 'orange' }}>
        {params.value}
      </span>
    )},
    { headerName: 'Client Name', field: 'clientName' },
    { headerName: 'Client Email', field: 'clientEmail' },
    { headerName: 'Delivery Source', field: 'deliverySource' },
    { headerName: 'Vehicle Type', field: 'vehicleType' },
    { headerName: 'Line Item Quantity', field: 'lineItemQuantity' },
    { headerName: 'Line Item Unit', field: 'lineItemUnit' },
    { headerName: 'Price', field: 'price' },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div className="child-group-action-icon">
          <button className="child-view-action-btn" onClick={() => handleViewDetails(params.data)}>
            <FaEye title="View" />
          </button>
        </div>
      ),
    },
  ];

  const childrenOrdersData = flattenChildrenRecurringOrderData(data?.getChildrenRecurringOrders || []);

  if (loading) return <p>Loading children recurring orders...</p>;
  if (error) return <p className="error-message">Error loading children recurring orders: {error.message}</p>;

  return (
    <div className="child-group-container">
      <h2>Children Recurring Orders List</h2>
      <div className="ag-theme-alpine" style={{ width: '100%' }}>
        <AgGridReact
          rowData={childrenOrdersData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"

        />
      </div>

      {selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>Order Details</h2>
            <p><strong>ID:</strong> {selectedOrder.id}</p>
            <p><strong>Start On:</strong> {selectedOrder.startOn}</p>
            <p><strong>Completed On:</strong> {selectedOrder.completedOn}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Client Name:</strong> {selectedOrder.clientName}</p>
            <p><strong>Client Email:</strong> {selectedOrder.clientEmail}</p>
            <p><strong>Delivery Source:</strong> {selectedOrder.deliverySource}</p>
            <p><strong>Vehicle Type:</strong> {selectedOrder.vehicleType}</p>
            <p><strong>Line Item Quantity:</strong> {selectedOrder.lineItemQuantity}</p>
            <p><strong>Line Item Unit:</strong> {selectedOrder.lineItemUnit}</p>
            <p><strong>Price:</strong> {selectedOrder.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildrenRecurringOrder;
