import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useAddMerchandise, useEditMerchandise, useDeleteMerchandise } from './MerchandiseHandler';
import {
  GET_ALL_MERCHANDISE_QUERY,
  GET_MERCHANDISE_BY_CATEGORY_QUERY,
  GET_ALL_MERCHANDISE_CATEGORIES,
} from '../../graphql/queries/MerchandiseQueries';
import MerchandiseForm from './MerchandiseForm';
import '../../assets/css/Merchandise.css';
import Slider from '../Slider';

const Merchandise = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_MERCHANDISE_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [selectedMerchandise, setSelectedMerchandise] = useState(null);
  const [viewMerchandise, setViewMerchandise] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);


  const { loading: merchLoading, data: merchData} = useQuery(
    categoryId ? GET_MERCHANDISE_BY_CATEGORY_QUERY : GET_ALL_MERCHANDISE_QUERY,
    { variables: categoryId ? { merchandiseCategoryId: categoryId } : {} }
  );

  useEffect(() => {
    if (merchData) {
      setRowData(categoryId ? merchData.getMerchandiseByCategory : merchData.getAllMerchandises);
    }
  }, [merchData, categoryId]);

  const handleAdd = useAddMerchandise(refetch, setIsModalOpen, setErrorMessage, categoryId);
  const handleUpdate = useEditMerchandise(refetch, setIsModalOpen, setErrorMessage, categoryId);
  const handleDelete = useDeleteMerchandise(refetch, categoryId);

  const categories = data?.getAllMerchandiseCategories || [];
  const columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true },
    { headerName: 'Category ID', field: 'merchandiseCategoryId', sortable: true, filter: true },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: (params) => (
        <span className={params.value === 'available' ? 'merchandise-status-available' : 'merchandise-status-out-of-stock'}>
          {params.value === 'available' ? 'Available' : 'Out of Stock'}
        </span>
      ),
      sortable: true,
      filter: true,
    },
    { headerName: 'Unit', field: 'unit', sortable: true, filter: true },
    { headerName: 'Category Name', field: 'merchandiseCategory.name', sortable: true, filter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params) => (
        <div className="merchandise-actions">
          <button onClick={() => setViewMerchandise(params.data)} className="merchandise-action-btn">
            <FaEye title="View" />
          </button>
          <button
            onClick={() => {
              setSelectedMerchandise(params.data);
              setIsModalOpen(true);
            }}
            className="merchandise-action-btn"
          >
            <FaEdit title="Edit" />
          </button>
          <button onClick={() => handleDelete(params.data.id)} className="merchandise-action-btn">
            <FaTrash title="Delete" />
          </button>
        </div>
      ),
      width: 200,
    },
  ];

  if (loading || merchLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <Slider/>
    <div className="merchandise-container">
      <div className="merchandise-header">
        <h2>Merchandise List</h2>
        <button className="merchandise-add-btn" onClick={() => setIsModalOpen(true)}>
          <FaPlus /> Add
        </button>
      </div>
      <div className="filter-section">
        <label htmlFor="category-select">Select Category:</label>
        <select
          id="category-select"
          value={categoryId || ''}
          onChange={(e) => setCategoryId(e.target.value || null)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="ag-theme-alpine-dark">
        <AgGridReact rowData={rowData} 
        columnDefs={columnDefs}
         pagination={true} 
         paginationPageSize={10} 
         domLayout="autoHeight" 
         />
      </div>
      {isModalOpen && (
        <MerchandiseForm
          handleCreate={handleAdd}
          handleEdit={handleUpdate}
          selectedMerchandise={selectedMerchandise}
          setSelectedMerchandise={setSelectedMerchandise}
          categories={categories}
          onClose={() => setIsModalOpen(false)}
          errorMessage={errorMessage}
        />
      )}
      {viewMerchandise && (
        <div className="merchandise-view-modal">
          <button className="close-button" onClick={() => setViewMerchandise(null)}>X</button>
          <h2>Merchandise Details</h2>
          <h3>{viewMerchandise.name}</h3>
          <p>Price: ${viewMerchandise.price}</p>
          <p>Status: {viewMerchandise.status}</p>
          <p>Unit: {viewMerchandise.unit}</p>
          <p>Description: {viewMerchandise.description}</p>
          <p>Category: {viewMerchandise.merchandiseCategory.name}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default Merchandise;
