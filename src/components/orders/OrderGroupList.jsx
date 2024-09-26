import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { FaEye, FaEdit, FaTrashAlt, FaPlus, FaArrowRight } from 'react-icons/fa';
import { GET_ALL_ORDER_GROUPS } from '../../graphql/queries/OrderGroupQueries';
import { useEditOrderGroup, useDeleteOrderGroup, useCreateOrderGroup } from './OrderGroupHandler';
import OrderGroupForm from './OrderGroupForm';
import '../../assets/css/OrderGroup.css';
import { CHANGE_STATUS_TO_DELIVERED, CHANGE_STATUS_TO_CANCELLED } from '../../graphql/mutation/ChangeStatusMutation';
import { useNavigate } from 'react-router-dom';

const flattenOrderGroupData = (orderGroups) => {
  return orderGroups.map(order => ({
    id: order.id,
    startOn: order.startOn,
    status: order.status,
    clientName: order.client?.name || 'N/A',
    venueName: order.venue?.name || 'N/A',

    deliverySource: order.deliveryOrder?.source || 'N/A',
    vehicleType: order.deliveryOrder?.vehicleType || 'N/A',
    transportName: order.deliveryOrder?.transport?.name || 'N/A',
    transportStatus: order.deliveryOrder?.transport?.status || 'N/A',
    courierEmail: order.deliveryOrder?.courier?.email || 'N/A',
    courierName: `${order.deliveryOrder?.courier?.firstName || ''} ${order.deliveryOrder?.courier?.lastName || ''}`.trim(),
    
    lineItems: order.deliveryOrder?.lineItems || [],
    lineItemQuantity: order.deliveryOrder?.lineItems[0]?.quantity || 'N/A',
    lineItemUnit: order.deliveryOrder?.lineItems[0]?.unit || 'N/A',
    merchandiseName: order.deliveryOrder?.lineItems[0]?.merchandise?.name || 'N/A',
    merchandiseCategory: order.deliveryOrder?.lineItems[0]?.merchandiseCategory?.name || 'N/A',

    recurringStartDate: order.recurring?.startDate || 'N/A',
    recurringEndDate: order.recurring?.endDate || 'N/A',
    recurringFrequency: order.recurring?.frequency || 'N/A',
    completedOn:order.completedOn || 'N/A',
  }));
};

const OrderGroupList = ({filterRecurring}) => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedOrderGroup, setSelectedOrderGroup] = useState(null);
  const [viewOpen, setViewOpen] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null); 
  const navigate = useNavigate();


  const { loading, error, data, refetch } = useQuery(GET_ALL_ORDER_GROUPS);
  const [changeStatusToDelivered] = useMutation(CHANGE_STATUS_TO_DELIVERED);
  const [changeStatusToCancelled] = useMutation(CHANGE_STATUS_TO_CANCELLED);
  
  const handleCreate = useCreateOrderGroup(refetch, setFormOpen, setErrorMessage);
  const handleUpdate = useEditOrderGroup(refetch, setFormOpen, setErrorMessage);
  const handleDelete = useDeleteOrderGroup(refetch);

  useEffect(() => {
    if (data) {
      console.log(data.getAllOrderGroups); 
    }
  }, [data]);

  const orderGroupsData = flattenOrderGroupData(data?.getAllOrderGroups || []);
  
  const filteredData = filterRecurring === undefined 
    ? orderGroupsData 
    : filterRecurring 
      ? orderGroupsData.filter(order => 
          order.recurringStartDate !== 'N/A' &&
          order.recurringEndDate !== 'N/A' &&
          order.recurringFrequency !== 'N/A'
        )
      : orderGroupsData.filter(order => 
          order.recurringStartDate === 'N/A' ||
          order.recurringEndDate === 'N/A' ||
          order.recurringFrequency === 'N/A'
        );
  
        const handleShowChildrenOrders = (mainRecurringOrderId) => {
          navigate(`/childrenrecurringorder/${mainRecurringOrderId}`);

        };
           
      

  const handleChangeStatus = async (orderGroupId, status) => {
    try {
      const mutation = status === 'delivered' ? changeStatusToDelivered : changeStatusToCancelled;
      const { data } = await mutation({ variables: { orderGroupId } });

      if (data.changeStatusToDelivered?.message || data.changeStatusToCancelled?.message) {
        refetch(); 
        alert(`Order has been marked as ${status}!`);
        setSelectedStatus(null); 
      }
    } catch (error) {
      console.error("Error changing status:", error);
      setErrorMessage("Failed to change status.");
      alert("Failed to change status.");
    }
  };

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Start On', field: 'startOn' },
    { headerName: 'Status', field: 'status', cellRenderer: params => (
      <span style={{ color: params.value === 'delivered' ? 'green' : params.value === 'cancelled' ? 'red' : 'yellow' }}>
        {params.value}
      </span>
    )},
    { headerName: 'Client Name', field: 'clientName' },
    { headerName: 'Venue Name', field: 'venueName' },
    { headerName: 'Delivery Source', field: 'deliverySource' },
    { headerName: 'Vehicle Type', field: 'vehicleType' },
    { headerName: 'Transport Name', field: 'transportName' },
    { headerName: 'Transport Status', field: 'transportStatus' },
    { headerName: 'Courier Name', field: 'courierName' },
    { headerName: 'Completed On', field: 'completedOn' },
    { headerName: 'Recurring Start Date', field: 'recurringStartDate' },
    { headerName: 'Recurring End Date', field: 'recurringEndDate' },
    { headerName: 'Recurring Frequency', field: 'recurringFrequency' },
    { headerName: 'Line Item Quantity', field: 'lineItemQuantity' },
    { headerName: 'Line Item Unit', field: 'lineItemUnit' },
    { headerName: 'Merchandise Name', field: 'merchandiseName' },
    { headerName: 'Merchandise Category', field: 'merchandiseCategory' },
    
    // { headerName: 'Line Item', field: 'lineItems.length', valueGetter: params => params.data.lineItems.length },
    { headerName: 'Actions',
      cellRenderer: (params) => (
        <div className="order-group-action-icon">
          <button onClick={() => setViewOpen(params.data)} className="order-view-action-btn">
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
          {params.data.recurringStartDate !== 'N/A' && (
             <button 
             onClick={() => handleShowChildrenOrders(params.data.id)}
             className="order-show-action-btn">
             <FaArrowRight title="Show Children" />
           </button>
          )}
        </div>
      ),
    },
  ];

  if (loading) return <p>Loading order groups...</p>;
  if (error) return <p className="error-message">Error loading order groups: {error.message}</p>;

  return (
    <div className="order-group-list-container">
      <button onClick={() => setFormOpen(true)} className="order-group-add-btn">
        <FaPlus /> Add
      </button>
      <div className="ag-theme-alpine-dark" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          rowData={filteredData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
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
          onAdd={handleCreate}
          onUpdate={handleUpdate}
          errorMessage={errorMessage}
        />
      )}


   
      {viewOpen && (
        <div className="order-group-view-modal">
          <button className="close-button" onClick={() => setViewOpen(null)}>X</button>
          <h2>Order Group Details</h2>
          <p><strong>ID:</strong> {viewOpen.id}</p>
          <p><strong>Start On:</strong> {viewOpen.startOn}</p>
          <p><strong>Status:</strong> {viewOpen.status}</p>
          <p><strong>Client Name:</strong> {viewOpen.clientName}</p>
          <p><strong>Delivery Source:</strong> {viewOpen.deliverySource}</p>
          <p><strong>Vehicle Type:</strong> {viewOpen.vehicleType}</p>
          <p><strong>Transport Name:</strong> {viewOpen.transportName}</p>
          <p><strong>Transport Status:</strong> {viewOpen.transportStatus}</p>
          <p><strong>Courier Name:</strong> {viewOpen.courierName}</p>
          <p><strong>Courier Email:</strong> {viewOpen.courierEmail}</p>
          {/* <p><strong>Bio:</strong> {viewOpen.bio}</p> */}
          <p><strong>Venue Name:</strong> {viewOpen.venueName}</p>

          <legend>Line Items:</legend>
          <hr />
          <table border="1px">
            <thead>
              <tr>
                <th>Category</th>
                <th>Merchandise</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {viewOpen.lineItems && viewOpen.lineItems.length > 0 ? (
                viewOpen.lineItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.merchandiseCategory?.name || 'N/A'}</td>
                    <td>{item.merchandise?.name || 'N/A'}</td>
                    <td>{item.price || 'N/A'}</td>
                    <td>{item.unit || 'N/A'}</td>
                    <td>{item.quantity || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No line items found.</td>
                </tr>
              )}
            </tbody>
          </table>

          <legend>Change Status:</legend>
          <div>
            <label style={{ color: selectedStatus === 'delivered' ? 'green' : 'black' }}>
              <input
                type="radio"
                name="status"
                checked={selectedStatus === 'delivered'}
                onChange={() => {
                  setSelectedStatus('delivered');
                  handleChangeStatus(viewOpen.id, 'delivered');
                }}
              />
              Delivered
            </label>
            <label style={{ color: selectedStatus === 'cancelled' ? 'red' : 'black' }}>
              <input
                type="radio"
                name="status"
                checked={selectedStatus === 'cancelled'}
                onChange={() => {
                  setSelectedStatus('cancelled');
                  handleChangeStatus(viewOpen.id, 'cancelled');
                }}
              />
              Cancelled
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderGroupList;
