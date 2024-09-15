import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  CREATE_MERCHANDISE,
  EDIT_MERCHANDISE,
  DELETE_MERCHANDISE
} from '../../graphql/mutation/MerchandiseMutation';
import {
  GET_ALL_MERCHANDISE_QUERY,
  GET_MERCHANDISE_BY_CATEGORY_QUERY,
  GET_ALL_MERCHANDISE_CATEGORIES
} from '../../graphql/queries/MerchandiseQueries';
import MerchandiseForm from './MerchandiseForm';
import MerchandiseList from './MerchandiseList';
import { FaPlus } from 'react-icons/fa';

export default function Merchandise() {
  const [categoryId, setCategoryId] = useState(null);
  const [selectedMerchandise, setSelectedMerchandise] = useState(null);
  const [viewMerchandise, setViewMerchandise] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [rowData, setRowData] = useState([]);

  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_ALL_MERCHANDISE_CATEGORIES);
  const { loading: merchandiseLoading, error: merchandiseError, data: merchandiseData, refetch } = useQuery(
    categoryId ? GET_MERCHANDISE_BY_CATEGORY_QUERY : GET_ALL_MERCHANDISE_QUERY,
    { variables: categoryId ? { merchandiseCategoryId: categoryId } : {} }
  );

  const [createMerchandise] = useMutation(CREATE_MERCHANDISE);
  const [updateMerchandise] = useMutation(EDIT_MERCHANDISE);
  const [deleteMerchandise] = useMutation(DELETE_MERCHANDISE);

  useEffect(() => {
    if (merchandiseData) {
      setRowData(categoryId ? merchandiseData.getMerchandiseByCategory : merchandiseData.getAllMerchandises);
    }
  }, [merchandiseData, categoryId]);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
    setSelectedMerchandise(null); 
  };

  const handleCreate = async (merchandise) => {
    try {
      await createMerchandise({
        variables: {
          merchandiseCategoryId: merchandise.merchandiseCategoryId,
          merchandiseInfo: {
            name: merchandise.name,
            price: parseFloat(merchandise.price),
            status: merchandise.status,
            unit: merchandise.unit,
            description: merchandise.description,
          },
        },
        refetchQueries: [{ query: categoryId ? GET_MERCHANDISE_BY_CATEGORY_QUERY : GET_ALL_MERCHANDISE_QUERY, variables: categoryId ? { merchandiseCategoryId: categoryId } : {} }],
      });
      refetch();
      toggleFormVisibility();
      alert('Merchandise created successfully.');
    } catch (err) {
      console.error('Error creating merchandise:', err);
      alert('Error creating merchandise. Please try again.');
    }
  };

  const handleEdit = async (id, merchandiseInfo) => {
    try {
      await updateMerchandise({
        variables: {
          merchandiseId: id,
          merchandiseInfo: {
            name: merchandiseInfo.name,
            price: parseFloat(merchandiseInfo.price),
            status: merchandiseInfo.status,
            unit: merchandiseInfo.unit,
            description: merchandiseInfo.description,
          },
        },
        refetchQueries: [{ query: categoryId ? GET_MERCHANDISE_BY_CATEGORY_QUERY : GET_ALL_MERCHANDISE_QUERY, variables: categoryId ? { merchandiseCategoryId: categoryId } : {} }],
      });
      refetch();
      setSelectedMerchandise(null);
      toggleFormVisibility();
      alert('Merchandise updated successfully.');
    } catch (err) {
      console.error('Error updating merchandise:', err);
      alert('Error updating merchandise. Please try again.');
    }
  };

  const handleDelete = async (merchandiseId) => {
    try {
      await deleteMerchandise({
        variables: { merchandiseId },
        refetchQueries: [{ query: categoryId ? GET_MERCHANDISE_BY_CATEGORY_QUERY : GET_ALL_MERCHANDISE_QUERY, variables: categoryId ? { merchandiseCategoryId: categoryId } : {} }],
      });
      refetch();
      alert('Merchandise deleted successfully.');
    } catch (err) {
      console.error('Error deleting merchandise:', err);
      alert('Error deleting merchandise. Please try again.');
    }
  };

  const handleView = (merchandise) => {
    setViewMerchandise(merchandise);
  };

  if (categoriesLoading || merchandiseLoading) 
    return <p>Loading...</p>;
  if (categoriesError || merchandiseError) 
    return <p>Error: {categoriesError?.message || merchandiseError?.message}</p>;

  const categories = categoriesData?.getAllMerchandiseCategories || [];

  return (
    <div className="merchandise-container">
      <div className="merchandise-header">
        <h2>Merchandise List</h2>
        <button className="merchandise-add-btn" onClick={toggleFormVisibility}>
          <FaPlus />
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
      <div>
        {showForm && (
          <MerchandiseForm
            handleCreate={handleCreate}
            handleEdit={handleEdit}
            selectedMerchandise={selectedMerchandise}
            setSelectedMerchandise={setSelectedMerchandise}
            toggleFormVisibility={toggleFormVisibility}
          />
        )}
        {viewMerchandise && (
          <div className="view-details">
            <h3>Merchandise Details</h3>
            <p><strong>Name:</strong> {viewMerchandise.name}</p>
            <p><strong>Price:</strong> {viewMerchandise.price}</p>
            <p><strong>Status:</strong> {viewMerchandise.status}</p>
            <p><strong>Unit:</strong> {viewMerchandise.unit}</p>
            <p><strong>Description:</strong> {viewMerchandise.description}</p>
            <button onClick={() => setViewMerchandise(null)}>Close</button>
          </div>
        )}
        <MerchandiseList
          rowData={rowData}
          handleEdit={(merchandise) => {
            setSelectedMerchandise(merchandise);
            setShowForm(true);
          }}
          handleDelete={handleDelete}
          handleView={handleView}
        />
      </div>
    </div>
  );
}
