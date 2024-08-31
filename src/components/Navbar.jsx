import React, { useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };


    const handleOptionChange = (event) => {
        const value = event.target.value;
        if (value === 'Pricing') {
            navigate('/pricing'); 
        }
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-logo">
                    <a href="/"><img src="src/assets/Images/logo.png" alt="Logo" /></a>
                    <FaBars className="navbar-menu-icon" onClick={toggleMenu} />
                </div>
                <ul className={`navbar-links ${isMenuOpen ? 'show' : ''}`}>
                    <li>
                        <select>
                            <option>Product</option>
                            <option>View</option>
                            <option>Create</option>
                        </select>
                    </li>
                    <li>
                        <select>
                            <option>Orders</option>
                            <option>Load</option>
                            <option>Delivery</option>
                            <option>Transfer</option>
                            <option>Extraction</option>
                        </select>
                    </li>
                    <li>
                        <select>
                            <option>Customers</option>
                            <option>View</option>
                            <option>Add</option>
                        </select>
                    </li>
                    <li>
                        <select>
                            <option>Solutions</option>
                            <option>View</option>
                            <option>Manage</option>
                        </select>
                    </li>
                    <li>
                        <select>
                            <option>Dispatch</option>
                            <option>View</option>
                            <option>Update</option>
                        </select>
                    </li>
                    <li>
                        <select onChange={handleOptionChange}>
                            <option>Pricing</option>
                            <option value="Pricing">View</option>
                        </select>
                    </li>
                </ul>

                <div className="navbar-search-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search or jump to..."
                        className={`navbar-search-input ${isSearchOpen ? 'open' : ''}`}
                    />
                    <FaSearch className="navbar-search-icon" onClick={toggleSearch} />
                </div>

                <div className="navbar-auth">
                    <a href="/signin">
                        Sign In
                    </a>
                    <a href="/signup">
                      Sign Up
                    </a>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
