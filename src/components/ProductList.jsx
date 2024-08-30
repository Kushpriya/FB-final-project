import React, { useState } from 'react';
import ProductItem from '../components/ProductItem';
import ProductForm from '../components/ProductForm';
import '../assets/css/ProductList.css';
import Navbar from './Navbar';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const addProduct = (newProduct) => {
        if (editingProduct) {
            setProducts(products.map(product => product.id === editingProduct.id ? newProduct : product));
            setEditingProduct(null);
        } else {
            setProducts([...products, { ...newProduct, id: Date.now() }]);
        }
        setFormVisible(false);
    };

    const editProduct = (product) => {
        setEditingProduct(product);
        setFormVisible(true);
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
        if (isFormVisible) setEditingProduct(null);
    };

    return (
        <div className="product-list-container">
            <Navbar />
            <div className="main-content">
                {isFormVisible ? (
                    <ProductForm addProduct={addProduct} product={editingProduct} />
                ) : (
                    <div className="product-list">
                        <h2>Products</h2>
                        <button onClick={toggleFormVisibility}>
                            {isFormVisible ? "Close Form" : "Add Product"}
                        </button>
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Total Sales</th>
                                    <th>Total Revenue</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <ProductItem
                                        key={product.id}
                                        product={product}
                                        onEdit={editProduct}
                                        onDelete={deleteProduct}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
