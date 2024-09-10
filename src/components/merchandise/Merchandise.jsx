import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/css/merchandise/MerchandiseForm.css';
import '../../assets/css/merchandise/MerchandiseList.css';
import Slider from '../Slider';
import MerchandiseAdd from './MerchandiseForm';
import MerchandiseList from './MerchandiseList';
import {
  CREATE_MERCHANDISE,
  EDIT_MERCHANDISE,
  DELETE_MERCHANDISE
} from "../../graphql/mutation/MerchandiseMutation";

function Merchandise() {
  const [merchandiseList, setMerchandiseList] = useState([]);
  const [newMerchandise, setNewMerchandise] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    quantity: 1,
    price: "",
    dateAdded: "",
    totalValue: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingMerchandiseId, setEditingMerchandiseId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMerchandise = merchandiseList.filter(
    (merchandise) =>
      merchandise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchandise.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMerchandise((prevMerchandise) => {
      const updatedMerchandise = { ...prevMerchandise, [name]: value };

      if (name === "quantity" || name === "price") {
        const quantity = name === "quantity" ? value : updatedMerchandise.quantity;
        const price = name === "price" ? value : updatedMerchandise.price;
        updatedMerchandise.totalValue = quantity * price;
      }

      return updatedMerchandise;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      newMerchandise.name &&
      newMerchandise.category &&
      newMerchandise.description &&
      newMerchandise.quantity > 0 &&
      newMerchandise.price > 0 &&
      newMerchandise.dateAdded &&
      newMerchandise.status
    ) {
      if (isEditing) {
        setMerchandiseList((prevMerchandiseList) =>
          prevMerchandiseList.map((merchandise) =>
            merchandise.id === editingMerchandiseId ? { ...newMerchandise, id: editingMerchandiseId } : merchandise
          )
        );
        setIsEditing(false);
        setEditingMerchandiseId(null);
      } else {
        const newId = merchandiseList.length + 1;
        setMerchandiseList((prevMerchandiseList) => [
          ...prevMerchandiseList,
          { ...newMerchandise, id: newId },
        ]);
      }

      setNewMerchandise({
        id: "",
        name: "",
        category: "",
        description: "",
        quantity: 1,
        price: "",
        dateAdded: "",
        totalValue: "",
        status: "",
      });
      navigate('/merchandise/merchandiselist'); 
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleEdit = (merchandise) => {
    setIsEditing(true);
    setEditingMerchandiseId(merchandise.id);
    setNewMerchandise(merchandise);
    navigate('/merchandise/merchandiseform'); 
  };

  const handleDelete = (merchandiseId) => {
    const confirmed = window.confirm("Are you sure you want to delete this merchandise?");
    if (confirmed) {
      setMerchandiseList(merchandiseList.filter((merchandise) => merchandise.id !== merchandiseId));
    }
  };

  const handleOpenForm = () => {
    setFormVisible(true);
    setShowCloseButton(true);
    navigate('/merchandise/merchandiseform'); 
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setShowCloseButton(false);
    navigate('/merchandise/merchandiselist'); 
  };

  return (
    <>
      <Slider />
      <div className="merchandise-container">
        <div className="merchandise-content">
          {location.pathname === '/merchandise/merchandiseform' && (
            <MerchandiseAdd
              newMerchandise={newMerchandise}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isEditing={isEditing}
              handleCloseForm={handleCloseForm}
              showCloseButton={showCloseButton}
            />
          )}
          {location.pathname === '/merchandise/merchandiselist' && (
            <MerchandiseList
              merchandiseList={merchandiseList}
              filteredMerchandise={filteredMerchandise}
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

export default Merchandise;
