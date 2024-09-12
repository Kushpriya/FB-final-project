import React from "react";
import { AgGridReact } from "ag-grid-react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import "../../assets/css/MerchandiseCategory.css";

const MerchandiseCategoryList = ({ categories, onView, onEdit, onDelete }) => {
  const columnDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "Category Name", field: "name", sortable: true, filter: true },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="action-icons">
          <FaEye onClick={() => onView(params.data)} title="View" />
          <FaEdit onClick={() => onEdit(params.data)} title="Edit" />
          <FaTrashAlt onClick={() => onDelete(params.data.id)} title="Delete" />
        </div>
      ),
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      {categories.length ? (
        <AgGridReact
          rowData={categories}
          columnDefs={columnDefs}
          defaultColDef={{ resizable: true, sortable: true, filter: true }}
          pagination={true}
          paginationPageSize={10}
        />
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default MerchandiseCategoryList;
