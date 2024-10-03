import React from "react";
import { useQuery } from "@apollo/client";
import { GET_MERCHANDISE_CATEGORY_ID } from "../../graphql/CategoryQueries";
import "./style.css";

const MerchandiseCategoryView = ({ categoryId, onClose }) => {
  const { loading, error, data } = useQuery(GET_MERCHANDISE_CATEGORY_ID, {
    variables: { merchandiseCategoryId: categoryId },
    skip: !categoryId,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const category = data?.getMerchandiseCategoryById;

  return (
      <div className="category-view-overlay">
      <div className="category-view-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Category Details</h2>
        {category ? (
          <div>
            <p><strong>ID:</strong> {category.id}</p>
            <p><strong>Name:</strong> {category.name}</p>
            <p><strong>Description:</strong> {category.description}</p>
            <p><strong>Created At:</strong> {new Date(category.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(category.updatedAt).toLocaleString()}</p>
          </div>
        ) : (
          <p>No category data available.</p>
        )}
      </div>
      </div>
  );
};

export default MerchandiseCategoryView;
