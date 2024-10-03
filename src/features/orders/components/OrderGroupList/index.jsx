import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { FaEye, FaEdit, FaTrashAlt, FaPlus, FaArrowRight } from 'react-icons/fa';
import { GET_ALL_ORDER_GROUPS } from '../../graphql/OrderGroupQueries';
import { useEditOrderGroup } from '../../hooks/useEditOrderGroup';
import { useCreateOrderGroup } from '../../hooks/useCreateOrderGroup';
import { useDeleteOrderGroup } from '../../hooks/useDeleteOrderGroup';
import OrderGroupForm from '../OrderGroupForm';
import OrderGroupView from '../OrderGroupView';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { APP_URL } from '../../../../constants/APP_URL';

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
    completedOn: order.completedOn || 'N/A',
  }));
};

const OrderGroupList = ({ filterRecurring }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedOrderGroup, setSelectedOrderGroup] = useState(null);
  const [viewOpen, setViewOpen] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_ALL_ORDER_GROUPS);

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
    navigate(`${APP_URL.CHILDREN_RECURRING_ORDER(mainRecurringOrderId)}`);
  };

  const columnDefs = [
    { headerName: 'ID', field: 'id',sortable: true, filter: true, width:100 },
    { headerName: 'Start On', field: 'startOn',sortable: true, filter: true  },
    { headerName: 'Status', field: 'status',sortable: true, filter: true,  cellRenderer: params => (
      <span style={{ color: params.value === 'delivered' ? 'green' : params.value === 'cancelled' ? 'red' : 'orange' }}>
        {params.value}
      </span>
    )},
    { headerName: 'Completed On', field: 'completedOn',sortable: true, filter: true  },
    { headerName: 'Client Name', field: 'clientName',sortable: true, filter: true  },
    { headerName: 'Venue Name', field: 'venueName',sortable: true, filter: true  },
    { headerName: 'Delivery Source', field: 'deliverySource',sortable: true, filter: true  },
    { headerName: 'Vehicle Type', field: 'vehicleType',sortable: true, filter: true  },
    { headerName: 'Transport Name', field: 'transportName',sortable: true, filter: true  },
    { headerName: 'Transport Status', field: 'transportStatus',sortable: true, filter: true  },
    { headerName: 'Courier Name', field: 'courierName',sortable: true, filter: true  },
    { headerName: 'Recurring Start Date', field: 'recurringStartDate',sortable: true, filter: true  },
    { headerName: 'Recurring End Date', field: 'recurringEndDate',sortable: true, filter: true  },
    { headerName: 'Recurring Frequency', field: 'recurringFrequency',sortable: true, filter: true  },
    { headerName: 'Line Item Quantity', field: 'lineItemQuantity',sortable: true, filter: true  },
    { headerName: 'Line Item Unit', field: 'lineItemUnit' ,sortable: true, filter: true },
    { headerName: 'Merchandise Name', field: 'merchandiseName' ,sortable: true, filter: true },
    { headerName: 'Merchandise Category', field: 'merchandiseCategory' ,sortable: true, filter: true },
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
      <div className="ag-theme-alpine" style={{ width: '100%' }}>
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
        <OrderGroupView 
          viewOpen={viewOpen}
          setViewOpen={setViewOpen}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          // handleChangeStatus={handleChangeStatus}
        />
      )}
    </div>
  );
};

export default OrderGroupList;
