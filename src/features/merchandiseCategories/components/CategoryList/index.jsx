import React from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { AgGridReact } from "ag-grid-react";
import "./style.css";

const CategoryList = ({ categories, setViewCategoryId, setSelectedCategory, setFormOpen, handleDelete }) => {
  const columnDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true , width:100},
    { headerName: "Name", field: "name", sortable: true, filter: true },
    {
      headerName: "Actions",
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

  return (
    <div className="ag-theme-alpine"  style={{ width:'40%' }}>
      <AgGridReact
        rowData={categories}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default CategoryList;
