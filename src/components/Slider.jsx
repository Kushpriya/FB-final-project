import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaBars, FaTachometerAlt, FaUser, FaCog, FaSignOutAlt,
    FaBox, FaList, FaUsers, FaPlus, FaTruck, FaMoon, FaSun,
    FaSearch, FaBell
} from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import LOGOUT_MUTATION from '../graphql/mutation/LogoutMutation';
import '../assets/css/Slider.css';

function Sidebar({ handleOpenForm }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [activeMenu, setActiveMenu] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const [logout, { loading }] = useMutation(LOGOUT_MUTATION);

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

    const handleSignOut = async () => {
        try {
            const { data, errors } = await logout();
    
            if (errors) {
                console.error("GraphQL error:", errors);
                alert('Sign out failed due to server error.');
                return;
            }
    
            if (data?.logout?.success) {
                localStorage.removeItem('token');
                alert('Successfully signed out!');
                navigate('/signin');
            } else {
                alert('Sign out failed: ' + data?.logout?.message);
            }
        } catch (err) {
            console.error('Network error during sign-out:', err);
            alert('Sign out failed. Please try again later.');
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

                    <li onClick={() => handleMenuClick('merchandise')}>
                        <FaBox className="sidebar-icon" />
                        {isSidebarOpen && <span>Merchandise</span>}
                        {activeMenu === 'merchandise' && isSidebarOpen && (
                            <ul className="submenu">
                                <li onClick={() => navigateTo('/merchandise/merchandiseform')}><FaPlus className="sidebar-sub-icon" /> Add</li>
                                <li onClick={() => navigateTo('/merchandise/merchandiselist')}><FaList className="sidebar-sub-icon" /> List</li>
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
                                <li onClick={() => navigateTo('/clients/clientadd')}><FaPlus className="sidebar-sub-icon" /> Add</li>
                                <li onClick={() => navigateTo('/clients/clientlist')}><FaList className="sidebar-sub-icon" /> List</li>
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
                    
                    <li className="logout" onClick={handleSignOut} disabled={loading} >
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
