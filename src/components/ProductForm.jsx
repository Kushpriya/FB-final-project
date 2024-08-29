import React, { useState, useEffect } from 'react';
import '../assets/css/ProductList.css';

const ProductForm = ({ addProduct, product }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('Published');
    const [totalSales, setTotalSales] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState('');
    const [createdAt, setCreatedAt] = useState(new Date().toLocaleString());

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setStatus(product.status);
            setTotalSales(product.totalSales);
            setTotalRevenue(product.totalRevenue);
            setCreatedAt(product.createdAt);
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            id: product?.id || Date.now(),
            name,
            price,
            status,
            totalSales,
            totalRevenue,
            createdAt,
        };
        addProduct(newProduct);
        clearForm();
    };

    const clearForm = () => {
        setName('');
        setPrice('');
        setStatus('Published');
        setTotalSales(0);
        setTotalRevenue('');
        setCreatedAt(new Date().toLocaleString());
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div>
                <label>Product Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Price:</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div>
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            <div>
                <label>Total Sales:</label>
                <input type="number" value={totalSales} onChange={(e) => setTotalSales(e.target.value)} required />
            </div>
            <div>
                <label>Total Revenue:</label>
                <input type="text" value={totalRevenue} onChange={(e) => setTotalRevenue(e.target.value)} required />
            </div>
            <button type="submit">{product ? "Update Product" : "Add Product"}</button>
        </form>
    );
};

export default ProductForm;