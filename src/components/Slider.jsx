import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaBars, FaTachometerAlt, FaUsers, FaBox, FaLayerGroup, FaList, FaTruck, FaPlus, 
    FaWarehouse, FaBuilding, FaUserTie, FaMoon, FaSun, FaSearch, FaBell, FaUser
} from 'react-icons/fa';
import SignOut from './SignOut';
import '../assets/css/Slider.css';

function Slider({ handleOpenForm }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [activeMenu, setActiveMenu] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    }, [isDarkMode]);

    return (
        <>
            <div className={`sidebar-container ${isSidebarOpen ? '' : 'closed'} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    <FaBars />
                </button>
                <ul className="sidebar-content">
                    <li>
                        <Link to="/dashboard">
                            <FaTachometerAlt className="sidebar-icon" />
                            {isSidebarOpen && <span>Dashboard</span>}
                        </Link>
                    </li>

                    <li>
                        <Link to="/merchandiseCategory">
                            <FaLayerGroup className="sidebar-icon" />
                            {isSidebarOpen && <span>Merchandise Category</span>}
                        </Link>
                    </li>

                    <li>
                        <Link to="/merchandise">
                            <FaBox className="sidebar-icon" />
                            {isSidebarOpen && <span>Merchandise</span>}
                        </Link>
                    </li>

                    <li onClick={() => handleMenuClick('orders')}>
                        <FaList className="sidebar-icon" />
                        {isSidebarOpen && <span>Orders</span>}
                        {activeMenu === 'orders' && isSidebarOpen && (
                            <ul className="submenu">
                                <li>
                                    <Link to="/orders/delivery">
                                        <FaTruck className="sidebar-sub-icon" /> Delivery Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/orders/recurring">
                                        <FaCalendarAlt className="sidebar-sub-icon" /> Recurring Orders
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <Link to="/clients">
                            <FaUser className="sidebar-icon" />
                            {isSidebarOpen && <span>Clients</span>}
                        </Link>
                    </li>

                    <li>
                        <Link to="/transport">
                            <FaTruck className="sidebar-icon" />
                            {isSidebarOpen && <span>Transports</span>}
                        </Link>
                    </li>

                    <SignOut className="logout" />
                </ul>
            </div>

            <div className={`main-content ${isSidebarOpen ? '' : 'shifted'}`}>
                <div className={`nav_side ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                    <button className="theme-toggle" onClick={toggleTheme}>
                        {isDarkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    <div className="nav_side-right">
                        <div className="nav_side-search-container">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search or jump to..."
                                className={`nav_side-search-input ${isSearchOpen ? 'open' : ''}`}
                            />
                            <FaSearch className="nav_side-search-icon" onClick={toggleSearch} />
                        </div>
                        <FaBell className="nav_side-notification-icon" />
                        <FaUser className="nav_side-user-icon" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Slider;
