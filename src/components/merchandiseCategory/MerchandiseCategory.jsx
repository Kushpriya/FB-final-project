import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import MerchandiseCategoryAdd from "./MerchandiseCategoryAdd";
import MerchandiseCategoryView from "./MerchandiseCategoryView";
import { GET_ALL_MERCHANDISE_CATEGORIES } from "../../graphql/queries/MerchandiseCategoryQueries";
import "../../assets/css/MerchandiseCategory.css";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useAddMerchandiseCategory, useDeleteMerchandiseCategory, useEditMerchandiseCategory } from "./MerchandiseCategoryHandler";
import { AgGridReact } from "ag-grid-react";

const MerchandiseCategory = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_MERCHANDISE_CATEGORIES);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewCategoryId, setViewCategoryId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdd = useAddMerchandiseCategory(refetch, setFormOpen, setErrorMessage);
  const handleUpdate = useEditMerchandiseCategory(refetch, setFormOpen, setErrorMessage);
  const handleDelete = useDeleteMerchandiseCategory(refetch);

  const columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div className="merchandise-action-icon">
          <button onClick={() => setViewCategoryId(params.data.id)} className="merch-view-action-btn">
            <FaEye title="View" />
          </button>
          <button
            onClick={() => {
              setSelectedCategory(params.data);
              setFormOpen(true);
            }}
            className="merch-edit-action-btn"
          >
            <FaEdit title="Edit" />
          </button>
          <button onClick={() => handleDelete(params.data.id)} className="merch-delete-action-btn">
            <FaTrashAlt title="Delete" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <div className="category-container">
      <button className="category-button" onClick={() => setFormOpen(true)}>
        <FaPlus /> Add Category
      </button>

      <div className="ag-theme-alpine-dark" style={{ width: '77%', height: '100%' }}>
        <AgGridReact
          rowData={data.getAllMerchandiseCategories}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
          
        />
      </div>

      {formOpen && (
        <MerchandiseCategoryAdd
          addCategory={handleAdd}
          editingCategory={selectedCategory}
          updateCategory={handleUpdate}
          onClose={() => {
            setFormOpen(false);
            setSelectedCategory(null);
          }}
        />
      )}

      {viewCategoryId && (
        <MerchandiseCategoryView
          categoryId={viewCategoryId}
          onClose={() => setViewCategoryId(null)}
        />
      )}
    </div>
  );
};

export default MerchandiseCategory;