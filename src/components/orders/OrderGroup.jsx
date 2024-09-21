import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { GET_ALL_ORDER_GROUPS } from '../../graphql/queries/OrderGroupQueries';
import { useEditOrderGroup, useDeleteOrderGroup, useCreateOrderGroup } from './OrderGroupHandler';
import OrderGroupForm from './OrderGroupForm';
import '../../assets/css/OrderGroup.css';

const flattenOrderGroupData = (orderGroups) => {
  return orderGroups.map(order => ({
    id: order.id,
    startOn: order.startOn,
    status: order.status,

    clientName: order.client?.name || 'N/A',

    deliverySource: order.deliveryOrder?.source || 'N/A',
    vehicleType: order.deliveryOrder?.vehicleType || 'N/A',
    transportName: order.deliveryOrder?.transport?.name || 'N/A',
    transportStatus: order.deliveryOrder?.transport?.status || 'N/A',

    courierEmail: order.deliveryOrder?.courier?.email || 'N/A',
    courierName: `${order.deliveryOrder?.courier?.firstName || ''} ${order.deliveryOrder?.courier?.lastName || ''}`.trim(),
    bio: order.deliveryOrder?.courier?.bio || 'N/A',

    lineItemQuantity: order.deliveryOrder?.lineItems[0]?.quantity || 'N/A',
    lineItemUnit: order.deliveryOrder?.lineItems[0]?.unit || 'N/A',

    merchandiseCategory: order.deliveryOrder?.lineItems[0]?.merchandiseCategory?.name || 'N/A',

    merchandiseName: order.deliveryOrder?.lineItems[0]?.merchandise?.name || 'N/A',
    merchandiseDescription: order.deliveryOrder?.lineItems[0]?.merchandise?.description || 'N/A',

    price: order.deliveryOrder?.lineItems[0]?.price || 'N/A',

    venueName: order.venue?.name || 'N/A',

    recurringStartDate: order.recurring?.startDate || 'N/A',
    recurringEndDate: order.recurring?.endDate || 'N/A',
    recurringFrequency: order.recurring?.frequency || 'N/A',

    completedOn: order.completedOn || 'N/A',

    mainOrderGroupId: order.mainOrderGroupId || 'N/A',
  }));
};

const OrderGroup = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_ORDER_GROUPS);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedOrderGroup, setSelectedOrderGroup] = useState(null);
  const [viewOrderGroupId, setViewOrderGroupId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdd = useCreateOrderGroup(refetch, setFormOpen, setErrorMessage);
  const handleUpdate = useEditOrderGroup(refetch, setFormOpen, setErrorMessage);
  const handleDelete = useDeleteOrderGroup(refetch);

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Start On', field: 'startOn' },
    { headerName: 'Status', field: 'status' },
    { headerName: 'Client Name', field: 'clientName' },
    { headerName: 'Delivery Source', field: 'deliverySource' },
    { headerName: 'Vehicle Type', field: 'vehicleType' },
    { headerName: 'Transport Name', field: 'transportName' },
    { headerName: 'Transport Status', field: 'transportStatus' },
    { headerName: 'Courier Email', field: 'courierEmail' },
    { headerName: 'Courier Name', field: 'courierName' },
    { headerName: 'Bio', field: 'bio' },
    { headerName: 'Line Item Quantity', field: 'lineItemQuantity' },
    { headerName: 'Line Item Unit', field: 'lineItemUnit' },
    { headerName: 'Merchandise Category', field: 'merchandiseCategory' },
    { headerName: 'Merchandise Name', field: 'merchandiseName' },
    { headerName: 'Merchandise Description', field: 'merchandiseDescription' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Venue Name', field: 'venueName' },
    { headerName: 'Recurring Start Date', field: 'recurringStartDate' },
    { headerName: 'Recurring End Date', field: 'recurringEndDate' },
    { headerName: 'Recurring Frequency', field: 'recurringFrequency' },
    { headerName: 'Completed On', field: 'completedOn' },
    { headerName: 'Main Order Group ID', field: 'mainOrderGroupId' },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div className="order-group-action-icon">
          <button onClick={() => setViewOrderGroupId(params.data.id)} className="view-action-btn">
            <FaEye title="View" />
          </button>
          <button onClick={() => {
            setSelectedOrderGroup(params.data);
            setFormOpen(true);
          }} className="edit-action-btn">
            <FaEdit title="Edit" />
          </button>
          <button onClick={() => handleDelete(params.data.id)} className="delete-action-btn">
            <FaTrashAlt title="Delete" />
          </button>
        </div>
      ),
    },
  ];

  const orderGroupsData = flattenOrderGroupData(data?.getAllOrderGroups || []);

  if (loading) return <p>Loading order groups...</p>;
  if (error) return <p className="error-message">Error loading order groups: {error.message}</p>;

  return (
    <div className="order-group-container">
      <button onClick={() => setFormOpen(true)} className="order-group-add-btn">
        <FaPlus /> Add Order Group
      </button>
      <div className="ag-theme-alpine-dark">
        <AgGridReact
          rowData={orderGroupsData}
          columnDefs={columnDefs}
          pagination
          paginationPageSize={10}
          // defaultColDef={{
          //   sortable: true,
          //   filter: true,
          //   resizable: true,
          //   editable: false,
          // }}
          domLayout="autoHeight"
        />
      </div>

      {formOpen && (
        <OrderGroupForm
          selectedOrderGroup={selectedOrderGroup}
          onClose={() => {
            setFormOpen(false);
            setSelectedOrderGroup(null);
          }}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          errorMessage={errorMessage}
        />
      )}

      {viewOrderGroupId && (
        <OrderGroupView
          orderGroupId={viewOrderGroupId}
          onClose={() => setViewOrderGroupId(null)}
        />
      )}
    </div>
  );
};

export default OrderGroup;
