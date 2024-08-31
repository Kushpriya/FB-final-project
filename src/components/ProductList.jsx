import React, { useState } from 'react';
import ProductItem from '../components/ProductItem';
import ProductForm from '../components/ProductForm';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import '../assets/css/ProductList.css';
import Navbar from '../components/Navbar';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (confirmed) {
            setProducts(products.filter(product => product.id !== id));
        }
    };

    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
        if (isFormVisible) setEditingProduct(null);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="product-list-container">
            <Navbar />
            <div className="main-content">
                <div className="header">
                    <h2>Products</h2>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search product..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <FaSearch className="icon search-icon" />
                    </div>
                    <button onClick={toggleFormVisibility}>
                        {isFormVisible ? "Close Form" : "Add Product"}
                    </button>
                </div>

                {isFormVisible ? (
                    <ProductForm addProduct={addProduct} product={editingProduct} />
                ) : (
                    <div className="product-list">
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Total Sales</th>
                                    <th>Category</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <ProductItem
                                            key={product.id}
                                            product={product}
                                            onEdit={editProduct}
                                            onDelete={deleteProduct}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">No products found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
