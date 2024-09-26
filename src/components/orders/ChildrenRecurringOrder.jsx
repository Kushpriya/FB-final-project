import React from 'react';
import { useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { GET_CHILDREN_RECURRING_ORDERS } from '../../graphql/queries/OrderGroupQueries';
import '../../assets/css/Child.css';
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

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    // { headerName: 'Main Order Group ID', field: 'mainOrderGroupId' },
    { headerName: 'Start On', field: 'startOn' },
    { headerName: 'Completed On', field: 'completedOn' },
    { headerName: 'Status', field: 'status' },
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
          <button className="child-view-action-btn">
            <FaEye title="View" />
          </button>
          <button className="child-edit-action-btn">
            <FaEdit title="Edit" />
          </button>
          <button className="child-delete-action-btn">
            <FaTrashAlt title="Delete" />
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
      <div className="ag-theme-alpine-dark" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          rowData={childrenOrdersData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default ChildrenRecurringOrder;
