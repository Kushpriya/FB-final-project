import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import MerchandiseCategoryForm from "../components/CategoryForm";
import MerchandiseCategoryView from "../components/CategoryView";
import { GET_ALL_MERCHANDISE_CATEGORIES } from "../graphql/CategoryQueries";
import "./Category.css";
import { FaPlus } from "react-icons/fa";
import { useAddMerchandiseCategory } from "../hooks/useAddMerchandiseCategory";
import {useEditMerchandiseCategory } from "../hooks/useEditMerchandiseCategory";
import { useDeleteMerchandiseCategory} from "../hooks/useDeleteMerchandiseCategory";
import CategoryList from "../components/CategoryList";

const MerchandiseCategory = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_MERCHANDISE_CATEGORIES);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewCategoryId, setViewCategoryId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleAdd = useAddMerchandiseCategory(refetch, setFormOpen, setErrorMessage);
  const handleUpdate = useEditMerchandiseCategory(refetch, setFormOpen, setErrorMessage);
  const handleDelete = useDeleteMerchandiseCategory(refetch);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <div className="category-container">
      <button className="category-button" onClick={() => setFormOpen(true)}>
        <FaPlus /> Add Category
      </button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <CategoryList
        categories={data.getAllMerchandiseCategories}
        setViewCategoryId={setViewCategoryId}
        setSelectedCategory={setSelectedCategory}
        setFormOpen={setFormOpen}
        handleDelete={handleDelete}
      />

      {formOpen && (
        <MerchandiseCategoryForm
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
