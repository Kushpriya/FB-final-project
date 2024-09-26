import React, { useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../assets/css/Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const showSignInAlert = () => {
        alert('Please sign in first');
    };

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src="src/assets/Images/logo.png" alt="Logo" />
                    <FaBars className="navbar-menu-icon" onClick={toggleMenu} />
                </div>
                <ul className={`navbar-links ${isMenuOpen ? 'show' : ''}`}>
                    <li><a href="#" onClick={showSignInAlert}>Product</a></li>
                    <li><a href="#" onClick={showSignInAlert}>Orders</a></li>
                    <li><a href="#" onClick={showSignInAlert}>Customers</a></li>
                    <li><a href="#" onClick={showSignInAlert}>Solutions</a></li>
                    <li><a href="#" onClick={showSignInAlert}>Dispatch</a></li>
                    <li><Link to="/pricing" onClick={showSignInAlert}>Pricing</Link></li>
                </ul>

                <div className="navbar-search-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search ..."
                        className={`navbar-search-input ${isSearchOpen ? 'open' : ''}`}
                    />
                    <FaSearch className="navbar-search-icon" onClick={toggleSearch} />
                </div>

                <div className="navbar-auth">
                    <button><Link to="/signin">Sign In</Link></button>
                    <button><Link to="/signup">Sign Up</Link></button>
                   
                </div>
            </nav>

        </div>
    );
};

export default Navbar;
