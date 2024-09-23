import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { FaEye, FaEdit, FaTrashAlt} from 'react-icons/fa';
import '../../assets/css/OrderGroup.css';
import { GET_MAIN_RECURRING_ORDERS } from '../../graphql/queries/OrderGroupQueries';

const flattenRecurringOrderData = (orders) => {
  return orders.map(order => ({
    id: order.id,
    mainOrderGroupId: order.mainOrderGroupId,
    startOn: order.startOn,
    completedOn: order.completedOn,
    status: order.status,
    clientId: order.clientId || 'N/A',
    deliverySource: order.deliveryOrder?.source || 'N/A',
    vehicleType: order.deliveryOrder?.vehicleType || 'N/A',
    lineItemQuantity: order.deliveryOrder?.lineItems[0]?.quantity || 'N/A',
    lineItemUnit: order.deliveryOrder?.lineItems[0]?.unit || 'N/A',
    merchandiseName: order.deliveryOrder?.lineItems[0]?.merchandise?.name || 'N/A',
    merchandiseCategory: order.deliveryOrder?.lineItems[0]?.merchandiseCategory?.name || 'N/A',
    price: order.deliveryOrder?.lineItems[0]?.price || 'N/A',
    tenantId: order.tenantId || 'N/A',
    venueId: order.venueId || 'N/A',
    recurringStartDate: order.recurring?.startDate || 'N/A',
    recurringEndDate: order.recurring?.endDate || 'N/A',
    recurringFrequency: order.recurring?.frequency || 'N/A',
  }));
};

const MainRecurringOrder = () => {
  const { loading, error, data, refetch } = useQuery(GET_MAIN_RECURRING_ORDERS);
  const [selectedOrderGroup, setSelectedOrderGroup] = useState(null);

 

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Main Order Group ID', field: 'mainOrderGroupId' },
    { headerName: 'Start On', field: 'startOn' },
    { headerName: 'Completed On', field: 'completedOn' },
    { headerName: 'Status', field: 'status' },
    { headerName: 'Client ID', field: 'clientId' },
    { headerName: 'Delivery Source', field: 'deliverySource' },
    { headerName: 'Vehicle Type', field: 'vehicleType' },
    { headerName: 'Line Item Quantity', field: 'lineItemQuantity' },
    { headerName: 'Line Item Unit', field: 'lineItemUnit' },
    { headerName: 'Merchandise Name', field: 'merchandiseName' },
    { headerName: 'Merchandise Category', field: 'merchandiseCategory' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Tenant ID', field: 'tenantId' },
    { headerName: 'Venue ID', field: 'venueId' },
    { headerName: 'Recurring Start Date', field: 'recurringStartDate' },
    { headerName: 'Recurring End Date', field: 'recurringEndDate' },
    { headerName: 'Recurring Frequency', field: 'recurringFrequency' },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div className="order-group-action-icon">
          <button onClick={() => setSelectedOrderGroup(params.data)} className="order-view-action-btn">
            <FaEye title="View" />
          </button>
          <button onClick={() => {
            setSelectedOrderGroup(params.data);
            setFormOpen(true);
          }} className="order-edit-action-btn">
            <FaEdit title="Edit" />
          </button>
          <button onClick={() => handleDelete(params.data.id)} className="order-delete-action-btn">
            <FaTrashAlt title="Delete" />
          </button>
        </div>
      ),
    },
  ];

  const recurringOrdersData = flattenRecurringOrderData(data?.getMainRecurringOrders || []);

  if (loading) return <p>Loading recurring orders...</p>;
  if (error) return <p className="error-message">Error loading recurring orders: {error.message}</p>;

  return (
    <div className="order-group-container">
      <h1>Main Recurring Order Group list</h1>
      <div className="ag-theme-alpine-dark" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          rowData={recurringOrdersData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>

    </div>
  );
};

export default MainRecurringOrder;
