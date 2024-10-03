import React from 'react';
import './style.css';
import { CHANGE_STATUS_TO_DELIVERED, CHANGE_STATUS_TO_CANCELLED } from '../../graphql/ChangeStatusMutation';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

const OrderGroupView = ({ viewOpen, setViewOpen, selectedStatus, setSelectedStatus, refetch }) => {
  const [changeStatusToDelivered] = useMutation(CHANGE_STATUS_TO_DELIVERED);
  const [changeStatusToCancelled] = useMutation(CHANGE_STATUS_TO_CANCELLED);

  const handleChangeStatus = async (orderGroupId, status) => {
    try {
      const mutation = status === 'delivered' ? changeStatusToDelivered : changeStatusToCancelled;
      const { data } = await mutation({ variables: { orderGroupId } });
  
      const isSuccess = status === 'delivered'
        ? !!data?.changeStatusToDelivered 
        : !!data?.changeStatusToCancelled; 
  
      if (isSuccess) {
        if (typeof refetch === 'function') {
          refetch(); 
        }
        toast.success(`Order has been marked as ${status}!`);
        setSelectedStatus(null); 
        setViewOpen(null);
      } else {
        toast.error("Failed to change status. No message returned.");
      }
    } catch (error) {
      console.error("Error changing status:", error);
      toast.error("Failed to change status. Please try again.");
    }
  };
  
  return (
    <div className="order-group-view-overlay">
      <div className="order-group-view-modal">
        <button className="close-button" onClick={() => setViewOpen(null)}>X</button>
        <h2>Order Group Details</h2>
        <p><strong>ID:</strong> {viewOpen?.id}</p>
        <p><strong>Start On:</strong> {viewOpen?.startOn}</p>
        <p><strong>Status:</strong> {viewOpen?.status}</p>
        <p><strong>Client Name:</strong> {viewOpen?.clientName}</p>
        <p><strong>Delivery Source:</strong> {viewOpen?.deliverySource}</p>
        <p><strong>Vehicle Type:</strong> {viewOpen?.vehicleType}</p>
        <p><strong>Transport Name:</strong> {viewOpen?.transportName}</p>
        <p><strong>Transport Status:</strong> {viewOpen?.transportStatus}</p>
        <p><strong>Courier Name:</strong> {viewOpen?.courierName}</p>
        <p><strong>Courier Email:</strong> {viewOpen?.courierEmail}</p>
        <p><strong>Venue Name:</strong> {viewOpen?.venueName}</p>

        <legend>Line Items:</legend>
        <hr />
        <table>
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
            {viewOpen?.lineItems?.length > 0 ? (
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
        <div className="status-options">
          <label className={`status-label ${selectedStatus === 'delivered' ? 'active-delivered' : ''}`}>
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
          <label className={`status-label ${selectedStatus === 'cancelled' ? 'active-cancelled' : ''}`}>
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
    </div>
  );
};

export default OrderGroupView;
