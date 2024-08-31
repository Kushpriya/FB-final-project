import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import '../assets/css/ProductList.css';

const ProductItem = ({ product, onEdit, onDelete }) => {
    const { name, price, status, totalSales, category, createdAt, id } = product;

    return (
        <tr className={`product-item ${status.toLowerCase()}`}>
            <td>{product.id}</td>
            <td>{name}</td>
            <td>${price.toFixed(2)}</td>
            <td>{status}</td>
            <td>{totalSales}</td>
            <td>{category}</td>
            <td>{new Date(createdAt).toLocaleDateString()}</td>
            <td className="action-icons">
                <FaEdit 
                    onClick={() => onEdit(product)} 
                    className="icon edit-icon" 
                    title="Edit"
                />
                <FaTrashAlt 
                    onClick={() => onDelete(id)} 
                    className="icon delete-icon" 
                    title="Delete"
                />
            </td>
        </tr>
    );
};

export default ProductItem;
