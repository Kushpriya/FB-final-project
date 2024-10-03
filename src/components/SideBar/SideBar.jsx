import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaBars, FaTachometerAlt, FaUsers, FaBox, FaLayerGroup, FaList, FaTruck,
    FaUser
} from 'react-icons/fa';
import './SideBar.css';
import Logout from '../../features/logout/pages/Logout';
import { APP_URL } from '../../constants/APP_URL';
import { useSelector } from 'react-redux';

function SideBar() {
    const user = useSelector((state) => state.auth.user);  // Get user from Redux state
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const sidebarItems = [
        { name: 'Dashboard', icon: <FaTachometerAlt />, route: APP_URL.DASHBOARD },
        { name: 'Merchandise Category', icon: <FaLayerGroup />, route: APP_URL.CATEGORY },
        { name: 'Merchandise', icon: <FaBox />, route: APP_URL.MERCHANDISE },
        { name: 'Order Group', icon: <FaList />, route: APP_URL.ORDER_GROUP },
        { name: 'Clients', icon: <FaUsers />, route: APP_URL.CLIENTS },
        { name: 'Transports', icon: <FaTruck />, route: APP_URL.TRANSPORT },
        { name: 'Couriers', icon: <FaUser />, route: APP_URL.COURIERS },
    ];

    return (
        <>
            <div className={`sidebar-container ${isSidebarOpen ? '' : 'closed'}`}>
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    <FaBars />
                </button>
                <ul className="sidebar-content">
                    {sidebarItems.map((item, index) => (
                        <li key={index} className={location.pathname === item.route ? 'active' : ''}>
                            <Link to={item.route}>
                                {item.icon}
                                {isSidebarOpen && <span>{item.name}</span>}
                            </Link>
                        </li>
                    ))}
                    <li className="logout">
                        <Logout className="logout" />
                    </li>
                </ul>
            </div>

            <div className={`main-content ${isSidebarOpen ? '' : 'shifted'}`}>
                <div className={`nav_side ${isSidebarOpen ? '' : 'shifted'}`}>
                    <div className="theme-toggle">
                        <img src="../../../src/assets/Images/logo.png" alt="Logo" />
                    </div>
                    <div className="nav_side-right">
                        <div className="nav_side-user-container">
                            <div className="profile-icon">
                                <FaUser className="nav_side-user-icon" />
                                {isSidebarOpen && (
                                    <span className="user-name">{user?.name}</span>  
                                )}
                                <div className="user-name-tooltip">
                                    {user?.name}  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;
