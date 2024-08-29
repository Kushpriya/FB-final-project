import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Import the hamburger icon
import '../assets/css/Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu toggle

    const handleLoginLogout = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleOptionChange = (event) => {
        const value = event.target.value;
        if (value) {
            window.location.href = value;
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/"><img src="src/assets/Images/logo.png" alt="Logo" /></a>
                <FaBars className="navbar-menu-icon" onClick={toggleMenu} /> {/* Hamburger icon */}
            </div>
            <ul className={`navbar-links ${isMenuOpen ? 'show' : ''}`}>
                <li><a href="/dashboard">Dashboard</a></li>
                <li>
                    <select onChange={handleOptionChange}>
                        <option value="/dispatch">Product</option>
                        <option value="/dispatch/view">View</option>
                        <option value="/dispatch/create">Create</option>
                    </select>
                </li>
                <li>
                    <select onChange={handleOptionChange}>
                        <option value="/orders">Orders</option>
                        <option value="/orders/view">Load order</option>
                        <option value="/orders/create">Delivery order</option>
                        <option value="/orders/create">Transfer order</option>
                        <option value="/orders/create">Extraction order</option>
                    </select>
                </li>
                <li>
                    <select onChange={handleOptionChange}>
                        <option value="/customers">Customers</option>
                        <option value="/customers/view">View</option>
                        <option value="/customers/add">Add</option>
                    </select>
                </li>
                <li>
                    <select onChange={handleOptionChange}>
                        <option value="/operations">Solutions</option>
                        <option value="/operations/view">View</option>
                        <option value="/operations/manage">Manage</option>
                    </select>
                </li>
                <li>
                    <select onChange={handleOptionChange}>
                        <option value="/pricing">Pricing</option>
                        <option value="/pricing/view">View</option>
                        <option value="/pricing/update">Update</option>
                    </select>
                </li>
                <li>
                    <select onChange={handleOptionChange}>
                        <option value="/reports">Products</option>
                        <option value="/reports/view">View</option>
                        <option value="/reports/generate">Generate</option>
                    </select>
                </li>
                
                {/* <li><a href="/tank-monitor">Tank Monitor</a></li> */}
            </ul>
            <div className={`navbar-auth ${isMenuOpen ? 'show' : ''}`}>
                {isLoggedIn ? (
                    <>
                        <a href="/profile">Profile</a>
                        <a href="/" onClick={handleLoginLogout}>Logout</a>
                    </>
                ) : (
                    <>
                        <a href="/login" onClick={handleLoginLogout}>Login</a>
                        <a href="/signup">Sign Up</a>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
