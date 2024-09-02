import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/css/ProductAdd.css';
import '../../assets/css/ProductList.css';
import Slider from '../../components/Slider';
import ProductAdd from './ProductAdd';
import ProductList from './ProductList';

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    quantity: 1,
    price: "",
    dateAdded: "",
    totalValue: "",
    supplier: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => {
      const updatedProduct = { ...prevProduct, [name]: value };

      if (name === "quantity" || name === "price") {
        const quantity = name === "quantity" ? value : updatedProduct.quantity;
        const price = name === "price" ? value : updatedProduct.price;
        updatedProduct.totalValue = quantity * price;
      }

      return updatedProduct;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      newProduct.name &&
      newProduct.category &&
      newProduct.description &&
      newProduct.quantity > 0 &&
      newProduct.price > 0 &&
      newProduct.dateAdded &&
      newProduct.supplier &&
      newProduct.status
    ) {
      if (isEditing) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editingProductId ? { ...newProduct, id: editingProductId } : product
          )
        );
        setIsEditing(false);
        setEditingProductId(null);
      } else {
        const newId = products.length + 1;
        setProducts((prevProducts) => [
          ...prevProducts,
          { ...newProduct, id: newId },
        ]);
      }

      setNewProduct({
        id: "",
        name: "",
        category: "",
        description: "",
        quantity: 1,
        price: "",
        dateAdded: "",
        totalValue: "",
        supplier: "",
        status: "",
      });
      navigate('/products/productlist'); 
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditingProductId(product.id);
    setNewProduct(product);
    navigate('/products/productadd'); 
  };

  const handleDelete = (productId) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      setProducts(products.filter((product) => product.id !== productId));
    }
  };

  const handleOpenForm = () => {
    setFormVisible(true);
    setShowCloseButton(true);
    navigate('/products/productadd'); 
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setShowCloseButton(false);
    navigate('/products/productlist'); 
  };

  return (
    <>
      <Slider />
      <div className="products-container">
        <div className="products-content">
          {location.pathname === '/products/productadd' && (
            <ProductAdd
              newProduct={newProduct}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isEditing={isEditing}
              handleCloseForm={handleCloseForm}
              showCloseButton={showCloseButton}
            />
          )}
          {location.pathname === '/products/productlist' && (
            <ProductList
              products={products}
              filteredProducts={filteredProducts}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleSearch={handleSearch}
              searchTerm={searchTerm}
              handleOpenForm={handleOpenForm}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
