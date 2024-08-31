import React, { useState, useEffect } from 'react';
import '../assets/css/ProductList.css';

const categories = [
    'Electronics',
    'Furniture',
    'Clothing',
    'Books',
    'Toys',
    'Sports',
    'Others'
];

const ProductForm = ({ addProduct, product }) => {
    const [formState, setFormState] = useState({
        name: '',
        price: '',
        status: 'Available',
        totalSales: '',
        category: '',
        createdAt: '' // This will be updated automatically
    });

    useEffect(() => {
        if (product) {
            setFormState({
                name: product.name || '',
                price: product.price || '',
                status: product.status || 'Available',
                totalSales: product.totalSales || '',
                category: product.category || '',
                createdAt: product.createdAt || new Date().toISOString().slice(0, 10) // Default to current date
            });
        } else {
            setFormState(prevState => ({
                ...prevState,
                createdAt: new Date().toISOString().slice(0, 10) // Set current date
            }));
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, price, status, totalSales, category, createdAt } = formState;
        if (name && price && status && totalSales && category) {
            addProduct({ ...formState, createdAt }); // Include createdAt in the form data
            setFormState({
                name: '',
                price: '',
                status: 'Available',
                totalSales: '',
                category: '',
                createdAt: new Date().toISOString().slice(0, 10) // Reset createdAt to current date
            });
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <div className="product-form-container">
            <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
            <form className="product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter product name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Enter price"
                        value={formState.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formState.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Available">Available</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="totalSales">Total Sales</label>
                    <input
                        type="number"
                        id="totalSales"
                        name="totalSales"
                        placeholder="Enter total sales"
                        value={formState.totalSales}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formState.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="createdAt">Created At</label>
                    <input
                        type="date"
                        id="createdAt"
                        name="createdAt"
                        value={formState.createdAt}
                        readOnly
                    /> */}
                {/* </div> */}
                <button type="submit" className="submit-button">
                    {product ? 'Update Product' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
