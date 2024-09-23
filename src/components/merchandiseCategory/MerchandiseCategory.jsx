import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import MerchandiseCategoryAdd from "./MerchandiseCategoryAdd";
import MerchandiseCategoryList from "./MerchandiseCategoryList";
import MerchandiseCategoryView from "./MerchandiseCategoryView";
import {
  GET_ALL_MERCHANDISE_CATEGORIES,
} from "../../graphql/queries/MerchandiseCategoryQueries";
import {
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
} from "../../graphql/mutation/MerchandiseCategoryMutation";
import "../../assets/css/MerchandiseCategory.css";
import Slider from "../Slider";
import { FaPlus } from "react-icons/fa";

const MerchandiseCategory = () => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewingCategoryId, setViewingCategoryId] = useState(null);

  const { loading, error, data, refetch } = useQuery(GET_ALL_MERCHANDISE_CATEGORIES, {
    onError: (err) => console.error("Query Error:", err),
  });

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    onCompleted: () => refetch(),
  });

  const [editCategory] = useMutation(EDIT_CATEGORY, {
    onCompleted: () => refetch(),
  });

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => refetch(),
  });

  const addCategory = async (category) => {
    await createCategory({ variables: { name: category.name, description: category.description } });
  };

  const handleUpdate = async (category) => {
    await editCategory({ variables: { merchandiseCategoryId: category.id, name: category.name, description: category.description } });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await deleteCategory({ variables: { merchandiseCategoryId: id } });
    }
  };

  const handleView = (category) => setViewingCategoryId(category.id);

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsFormVisible(true);
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <>
    <Slider />
    <div className="category-container">
      <button className="category-button" onClick={() => setIsFormVisible(true)}><FaPlus/>Add</button>

      {isFormVisible && (
        <MerchandiseCategoryAdd
          addCategory={addCategory}
          editingCategory={editingCategory}
          updateCategory={handleUpdate}
          onClose={() => setIsFormVisible(false)}
        />
      )}

      <MerchandiseCategoryList
        categories={data?.getAllMerchandiseCategories}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {viewingCategoryId && (
        <MerchandiseCategoryView
          categoryId={viewingCategoryId}
          onClose={() => setViewingCategoryId(null)}
        />
      )}
    </div>
    </>

  );
};

export default MerchandiseCategory;
