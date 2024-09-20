import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { GET_ALL_ORDER_GROUPS } from '../../graphql/queries/OrderGroupQueries';
import {  useEditOrderGroup, useDeleteOrderGroup, useCreateOrderGroup } from './OrderGroupHandler';
import OrderGroupForm from './OrderGroupForm';
import '../../assets/css/OrderGroup.css';

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
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Group Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Created Date', field: 'createdAt', sortable: true, filter: true },
    { headerName: 'Status', field: 'status', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div className="order-group-action-icon">
          <button onClick={() => setViewOrderGroupId(params.data.id)} className="view-action-btn">
            <FaEye title="View" />
          </button>
          <button
            onClick={() => {
              setSelectedOrderGroup(params.data);
              setFormOpen(true);
            }}
            className="edit-action-btn"
          >
            <FaEdit title="Edit" />
          </button>
          <button onClick={() => handleDelete(params.data.id)} className="delete-action-btn">
            <FaTrash title="Delete" />
          </button>
        </div>
      ),
    },
    
  ];

  if (loading) return <p>Loading order groups...</p>;
  if (error) return <p className="error-message">Error loading order groups: {error.message}</p>;

  return (
    <>
      <div className="order-group-container">
        <button onClick={() => setFormOpen(true)} className="order-group-add-btn">
          <FaPlus /> Add Order Group
        </button>
        <div className="ag-theme-alpine-dark">
          <AgGridReact
            rowData={data.getAllOrderGroups}
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
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            errorMessage={errorMessage}
          />
        )}

        {viewOrderGroupId && <OrderGroupView orderGroupId={viewOrderGroupId} />}
      </div>
    </>
  );
};

export default OrderGroup;
