import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FaPlus } from 'react-icons/fa';
import { useAddMerchandise } from '../hooks/useAddMerchandise';
import { useDeleteMerchandise } from '../hooks/useDeleteMerchandise';
import { useEditMerchandise } from '../hooks/useEditMerchandise';
import {
  GET_ALL_MERCHANDISE_QUERY,
  GET_MERCHANDISE_BY_CATEGORY_QUERY
} from '../graphql/MerchandiseQueries';
import MerchandiseForm from '../components/MerchandiseForm';
import MerchandiseView from '../components/MerchandiseView';
import MerchandiseList from '../components/MerchandiseList';
import './Merchandise.css';
import { GET_ALL_MERCHANDISE_CATEGORIES } from '../../merchandiseCategories/graphql/CategoryQueries';

const Merchandise = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_MERCHANDISE_CATEGORIES);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [selectedMerchandise, setSelectedMerchandise] = useState(null);
  const [viewMerchandise, setViewMerchandise] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [totalMerchandise, setTotalMerchandise] = useState(0);

  const { loading: merchLoading, data: merchData } = useQuery(
    categoryId ? GET_MERCHANDISE_BY_CATEGORY_QUERY : GET_ALL_MERCHANDISE_QUERY,
    { variables: categoryId ? { merchandiseCategoryId: categoryId } : {} }
  );

  useEffect(() => {
    if (merchData) {
      const merchandiseList = categoryId ? merchData.getMerchandiseByCategory : merchData.getAllMerchandises;
      setRowData(merchandiseList);
      setTotalMerchandise(merchandiseList.length); 
    }
  }, [merchData, categoryId]);

  const handleAdd = useAddMerchandise(refetch, setIsFormOpen, setErrorMessage, categoryId);
  const handleUpdate = useEditMerchandise(refetch, setIsFormOpen, setErrorMessage, categoryId);
  const handleDelete = useDeleteMerchandise(refetch, categoryId);

  const selectedCategoryName = data?.getAllMerchandiseCategories.find(category => category.id === categoryId)?.name || '';

  if (loading || merchLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="merchandise-container">
      <div className="merchandise-filter-section">
        <h2>Merchandise List</h2>
        <div className='total-merchandise'>
        Total {categoryId ? `${selectedCategoryName} ` : ''}Merchandise: {totalMerchandise}
      </div>
      <div>
        <label>Select Category:</label>
        <select
          id="category-select"
          value={categoryId || ''}
          onChange={(e) => setCategoryId(e.target.value || null)}
        >
          <option value="">All Categories</option>
          {data?.getAllMerchandiseCategories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      <button className="merchandise-add-btn" onClick={() => setIsFormOpen(true)}>
          <FaPlus /> Add Merchandise
        </button>
      </div>

      <MerchandiseList
        rowData={rowData} 
        setViewMerchandise={setViewMerchandise}
        setIsFormOpen={setIsFormOpen}
        setSelectedMerchandise={setSelectedMerchandise}
        handleDelete={handleDelete} 
        categories={data?.getAllMerchandiseCategories}
      />

      {isFormOpen && (
        <MerchandiseForm
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          selectedMerchandise={selectedMerchandise}
          setSelectedMerchandise={setSelectedMerchandise}
          categories={data?.getAllMerchandiseCategories}
          onClose={() => setIsFormOpen(false)}
          errorMessage={errorMessage}
        />
      )}
      {viewMerchandise && (
        <MerchandiseView
          viewMerchandise={viewMerchandise}
          setViewMerchandise={setViewMerchandise}
        />
      )}
    </div>
  );
};

export default Merchandise;
