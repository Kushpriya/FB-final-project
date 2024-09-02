import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaBars, FaTachometerAlt, FaUser, FaCog, FaSignOutAlt,
    FaBox, FaList, FaUsers, FaPlus, FaTruck, FaMoon, FaSun,
    FaSearch, FaBell
} from 'react-icons/fa';
import '../assets/css/Slider.css';

function Sidebar({ handleOpenForm }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [activeMenu, setActiveMenu] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

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

    const navigateTo = (path) => {
        navigate(path);
        if (path === '/orders/orderform') {
            handleOpenForm(); 
          }
    };

    return (
        <>
            <div className={`sidebar-container ${isSidebarOpen ? '' : 'closed'} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    <FaBars />
                </button>
                <ul className="sidebar-content">
                    <li onClick={() => { navigateTo('/dashboard'); }}>
                        <FaTachometerAlt className="sidebar-icon" />
                        {isSidebarOpen && <span>Dashboard</span>}
                    </li>
                    <li onClick={() => { navigateTo('/profile'); }}>
                        <FaUser className="sidebar-icon" />
                        {isSidebarOpen && <span>Profile</span>}
                    </li>

                    <li onClick={() => handleMenuClick('product')}>
                        <FaBox className="sidebar-icon" />
                        {isSidebarOpen && <span>Product</span>}
                        {activeMenu === 'product' && isSidebarOpen && (
                            <ul className="submenu">
                                <li onClick={() => navigateTo('/products/productadd')}><FaPlus className="sidebar-sub-icon" /> Add</li>
                                <li onClick={() => navigateTo('/products/productlist')}><FaList className="sidebar-sub-icon" /> List</li>
                            </ul>
                        )}
                    </li>
                     <li onClick={() => handleMenuClick('orders')}>
                      <FaList className="sidebar-icon" />
                        {isSidebarOpen && <span>Orders</span>}
                            {activeMenu === 'orders' && isSidebarOpen && (
                        <ul className="submenu">
                        <li onClick={() => navigateTo('/orders/orderform')}>
                            <FaPlus className="sidebar-sub-icon" /> Add
                        </li>
                        <li onClick={() => navigateTo('/orders/orderlist')}>
                            <FaList className="sidebar-sub-icon" /> List
                        </li>
                        </ul>
                    )}
                    </li>
                    <li onClick={() => handleMenuClick('clients')}>
                        <FaUsers className="sidebar-icon" />
                        {isSidebarOpen && <span>Clients</span>}
                        {activeMenu === 'clients' && isSidebarOpen && (
                            <ul className="submenu">
                                <li onClick={() => navigateTo('/add-client')}><FaPlus className="sidebar-sub-icon" /> Add</li>
                                <li onClick={() => navigateTo('/list-client')}><FaList className="sidebar-sub-icon" /> List</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => handleMenuClick('transport')}>
                        <FaTruck className="sidebar-icon" />
                        {isSidebarOpen && <span>Transport</span>}
                        {activeMenu === 'transport' && isSidebarOpen && (
                            <ul className="submenu">
                                <li onClick={() => navigateTo('/add-transport')}><FaPlus className="sidebar-sub-icon" /> Add</li>
                                <li onClick={() => navigateTo('/list-transport')}><FaList className="sidebar-sub-icon" /> List</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => navigateTo('/settings')}>
                        <FaCog className="sidebar-icon" />
                        {isSidebarOpen && <span>Settings</span>}
                    </li>
                    <li onClick={() => navigateTo('/signout')}>
                        <FaSignOutAlt className="sidebar-icon" />
                        {isSidebarOpen && <span>Sign out</span>}
                    </li>
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

export default Sidebar;
