import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Slider.css';
import { FaBars, FaTachometerAlt, FaUser, FaCog, FaSignOutAlt, FaBox, FaList, FaUsers } from 'react-icons/fa';

function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    }, [isDarkMode]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleSelectChange = (event) => {
        const value = event.target.value;
        switch (value) {
            case 'ProductList':
                navigate('/products');
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div className={`sidebar-container ${isSidebarOpen ? '' : 'closed'} ${isDarkMode ? '' : 'light-mode'}`}>
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    <FaBars />
                </button>
                <ul className="sidebar-content">
                    <li>
                        <FaTachometerAlt className="sidebar-icon" />
                        {isSidebarOpen && <span>Dashboard</span>}
                    </li>
                    <li>
                        <FaUser className="sidebar-icon" />
                        {isSidebarOpen && <span>Profile</span>}
                    </li>
                    <li className="settings-title">
                        <FaCog className="sidebar-icon" />
                        {isSidebarOpen && <span>Settings</span>}
                    </li>
                    <li>
                        <FaBox className="sidebar-icon" />
                        <select className={`sidebar-dropdown ${isSidebarOpen ? '' : 'hidden'}`} onChange={handleSelectChange}>
                            <option value="">Product</option>
                            <option value="ProductList">Product List</option>
                        </select>
                    </li>
                    <li>
                        <FaList className="sidebar-icon" />
                        <select className={`sidebar-dropdown ${isSidebarOpen ? '' : 'hidden'}`} onChange={handleSelectChange}>
                            <option>Orders</option>
                            <option>Load</option>
                            <option>Delivery</option>
                            <option>Transfer</option>
                            <option>Extraction</option>
                        </select>
                    </li>
                    <li>
                        <FaUsers className="sidebar-icon" />
                        <select className={`sidebar-dropdown ${isSidebarOpen ? '' : 'hidden'}`} onChange={handleSelectChange}>
                            <option>Customers</option>
                            <option>List</option>
                            <option>Add</option>
                        </select>
                    </li>
                    <li className="sidebar-logout">
                        <FaSignOutAlt className="sidebar-icon" />
                        {isSidebarOpen && <span>Sign out</span>}
                    </li>
                </ul>
            </div>

            <div className={`main-content ${isSidebarOpen ? '' : 'shifted'}`}>
                <div className={`nav-side ${isDarkMode ? '' : 'light-mode'}`}>
                    <button className="theme-toggle" onClick={toggleTheme}>
                        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                    </button>
                    <div className="nav-icons">
                        <div className={`nav-icon ${isDarkMode ? '' : 'light-mode'}`}>🔍</div>
                        <div className={`nav-icon ${isDarkMode ? '' : 'light-mode'}`}>🔔</div>
                        <div className={`nav-icon ${isDarkMode ? '' : 'light-mode'}`}>👤</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
