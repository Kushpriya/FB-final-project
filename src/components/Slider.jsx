import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaBars, FaTachometerAlt, FaUser, FaCog, FaSignOutAlt,
    FaBox, FaList, FaUsers, FaPlus, FaTruck, FaMoon, FaSun,
    FaSearch, FaBell
} from 'react-icons/fa';
import '../assets/css/Slider.css';

function Sidebar() {
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

    return (
        <>
            <div className={`sidebar-container ${isSidebarOpen ? '' : 'closed'} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    <FaBars />
                </button>
                <ul className="sidebar-content">
                    <li onClick={() => handleMenuClick('product')}>
                        <FaTachometerAlt className="sidebar-icon" />
                        
                        {isSidebarOpen && <span onClick={() => navigate('/dashboard')}>Dashboard</span>}
                    </li>
                    <li>
                        <FaUser className="sidebar-icon" />
                        {isSidebarOpen && <span>Profile</span>}
                    </li>
                  
                    <li onClick={() => handleMenuClick('product')}>
                        <FaBox className="sidebar-icon" />
                        {isSidebarOpen && <span>Product</span>}
                        {activeMenu === 'product' && isSidebarOpen && (
                            <ul className="submenu">
                                <li onClick={() => navigate('/add-product')}><FaPlus className="sidebar-sub-icon" /> Add</li>
                                <li onClick={() => navigate('/productlist')}><FaList className="sidebar-sub-icon" /> List</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => handleMenuClick('orders')}>
                        <FaList className="sidebar-icon" />
                        {isSidebarOpen && <span>Orders</span>}
                        {activeMenu === 'orders' && isSidebarOpen && (
                            <ul className="submenu">
                                <li onClick={() => navigate('/add-order')}><FaPlus className="sidebar-sub-icon" /> Add</li>
                                <li onClick={() => navigate('/orders')}><FaList className="sidebar-sub-icon" /> List</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => handleMenuClick('clients')}>
                        <FaUsers className="sidebar-icon" />
                        {isSidebarOpen && <span>Clients</span>}
                        {activeMenu === 'clients' && isSidebarOpen && (
                            <ul className="submenu">
                                <li onClick={() => navigate('/add-client')}><FaPlus className="sidebar-sub-icon" /> Add</li>
                                <li onClick={() => navigate('/list-client')}><FaList className="sidebar-sub-icon" /> List</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => handleMenuClick('transport')}>
                        <FaTruck className="sidebar-icon" />
                        {isSidebarOpen && <span>Transport</span>}
                        {activeMenu === 'transport' && isSidebarOpen && (
                            <ul className="submenu">
                                <li onClick={() => navigate('/add-transport')}><FaPlus className="sidebar-sub-icon" /> Add</li>
                                <li onClick={() => navigate('/list-transport')}><FaList className="sidebar-sub-icon" /> List</li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <FaCog className="sidebar-icon" />
                        {isSidebarOpen && <span>Settings</span>}
                    </li>
                    
                    <li className="sidebar-logout">
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
