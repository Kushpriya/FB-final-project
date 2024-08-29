import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ProductItem = ({ product, onEdit, onDelete }) => {
    return (
        <tr className={`product-item ${product.status.toLowerCase()}`}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.status}</td>
            <td>{product.totalSales}</td>
            <td>{product.totalRevenue}</td>
            <td>{product.createdAt}</td>
            <td className="action-icons">
                <FaEdit onClick={() => onEdit(product)} className="icon edit-icon" />
                <FaTrashAlt onClick={() => onDelete(product.id)} className="icon delete-icon" />
            </td>
        </tr>
    );
};

export default ProductItem;
