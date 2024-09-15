import React, { useState} from 'react';
import {useNavigate } from 'react-router-dom';
import {
    FaBars, FaTachometerAlt,FaBox, FaList, FaUsers,FaPlus, FaTruck,} from 'react-icons/fa';
import SignOut from './SignOut';
import '../assets/css/Sidebar.css';

function Sidebar({ handleOpenForm }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState(null);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const navigateTo = (path) => {
        navigate(path);
            handleOpenForm();
    };

    return (
        <>
            <div className={`sidebar-container ${isSidebarOpen ? '' : 'closed'} `}>
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    <FaBars />
                </button>
                <ul className="sidebar-content">
                    <li onClick={() => { navigateTo('/dashboard'); }}>
                        <FaTachometerAlt className="sidebar-icon" />
                        {isSidebarOpen && <span>Dashboard</span>}
                    </li>
                    {/* <li onClick={() => { navigateTo('/profile'); }}>
                        <FaUser className="sidebar-icon" />
                        {isSidebarOpen && <span>Profile</span>}
                    </li> */}

                    <li onClick={() => handleMenuClick('merchandiseCategory')}>
                        <FaBox className="sidebar-icon" />
                        {isSidebarOpen && <span>Merchandise Category</span>}
                        {activeMenu === 'merchandiseCategory' && isSidebarOpen && (
                            <ul className="submenu">
                                <li onClick={() => navigateTo('/merchandiseCategory/categoryadd')}><FaPlus className="sidebar-sub-icon" /> Add</li>
                                <li onClick={() => navigateTo('/merchandiseCategory/categorylist')}><FaList className="sidebar-sub-icon" /> List</li>
                            </ul>
                        )}
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
                                <li onClick={() => navigateTo('/clients/clientform')}><FaPlus className="sidebar-sub-icon" /> Add</li>
                                <li onClick={() => navigateTo('/clients/clientlist')}><FaList className="sidebar-sub-icon" /> List</li>
                            </ul>
                        )}
                    </li>
                    {/* <li onClick={() => handleMenuClick('venue')}>
                        <FaUsers className="sidebar-icon" />
                        {isSidebarOpen && <span>Venue</span>}
                        {activeMenu === 'venue' && isSidebarOpen && (
                            <ul className="submenu">
                                <li onClick={() => navigateTo('/venue/venueform')}><FaPlus className="sidebar-sub-icon" /> Add</li>
                                <li onClick={() => navigateTo('/venue/venuelist')}><FaList className="sidebar-sub-icon" /> List</li>
                                <li onClick={() => navigateTo('/venue/venueview')}><FaList className="sidebar-sub-icon" /> view</li>
                            </ul>
                        )}
                    </li> */}
                    <li onClick={() => handleMenuClick('couriers')}>
                        <FaUsers className="sidebar-icon" />
                        {isSidebarOpen && <span>Couriers</span>}
                        {activeMenu === 'couriers' && isSidebarOpen && (
                            <ul className="submenu">
                                <li onClick={() => navigateTo('/couriers/courierform')}><FaPlus className="sidebar-sub-icon" /> Add</li>
                                <li onClick={() => navigateTo('/couriers/courierlist')}><FaList className="sidebar-sub-icon" /> List</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => handleMenuClick('transport')}>
                        <FaTruck className="sidebar-icon" />
                        {isSidebarOpen && <span>Transport</span>}
                        {activeMenu === 'transport' && isSidebarOpen && (
                            <ul className="submenu">
                                <li onClick={() => navigateTo('/transports/transportform')}><FaPlus className="sidebar-sub-icon" /> Add</li>
                                <li onClick={() => navigateTo('/transports/transportlist')}><FaList className="sidebar-sub-icon" /> List</li>
                            </ul>
                        )}
                    </li>
                    {/* <li onClick={() => navigateTo('/settings')}>
                        <FaCog className="sidebar-icon" />
                        {isSidebarOpen && <span>Settings</span>}
                    </li> */}

                    <SignOut className="logout" />
                </ul>
            </div>         
        </>
    );
}

export default Sidebar;
