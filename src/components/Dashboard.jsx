import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Dashboard.css';
import { FaBars, FaTachometerAlt, FaUser, FaCog, FaSignOutAlt, FaBox, FaList, FaUsers } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 1000 },
  { name: 'Feb', value: 1200 },
  { name: 'Mar', value: 900 },
  { name: 'Apr', value: 1400 },
  { name: 'May', value: 1600 },
  { name: 'Jun', value: 1500 },
  { name: 'Jul', value: 1700 },
  { name: 'Aug', value: 1800 },
  { name: 'Sep', value: 1300 },
  { name: 'Oct', value: 1900 },
  { name: 'Nov', value: 2200 },
  { name: 'Dec', value: 2500 },
];

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
    <div className={`dashboard-container ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
      <div className={`sidebar ${isSidebarOpen ? '' : 'closed'}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <ul>
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
            <select className={`dropdown ${isSidebarOpen ? '' : 'hidden'}`} onChange={handleSelectChange}>
              <option value="">Product</option>
              <option value="ProductList">Product List</option>
              {/* <option>Create</option> */}
            </select>
          </li>
          <li>
            <FaList className="sidebar-icon" />
            <select className={`dropdown ${isSidebarOpen ? '' : 'hidden'}`} onChange={handleSelectChange}>
              <option>Orders</option>
              <option>Load</option>
              <option>Delivery</option>
              <option>Transfer</option>
              <option>Extraction</option>
            </select>
          </li>
          <li>
            <FaUsers className="sidebar-icon" />
            <select className={`dropdown ${isSidebarOpen ? '' : 'hidden'}`} onChange={handleSelectChange}>
              <option>Customers</option>
              <option>List</option>
              <option>Add</option>
            </select>
          </li>
          <li className="logout">
            <FaSignOutAlt className="sidebar-icon" />
            {isSidebarOpen && <span>Logout</span>}
          </li>
        </ul>
      </div>
      <div className={`main-content ${isSidebarOpen ? '' : 'shifted'}`}>
        <div className="navbar">
          <div className="navbar-icon">🔍</div>
          <div className="navbar-icon">🔔</div>
          <div className="navbar-icon">👤</div>
        </div>
        <div className="dashboard">
          <h2 className="dashboard-title">Analytics Dashboard</h2>
          <div className="dashboard-cards">
            <div className="card">
              <h3>Sales</h3>
              <p>2.382</p>
              <span className="negative">-3.65% Since last week</span>
            </div>
            <div className="card">
              <h3>Earnings</h3>
              <p>$21,300</p>
              <span className="positive">+6.65% Since last week</span>
            </div>
            <div className="card">
              <h3>Visitors</h3>
              <p>14,212</p>
              <span className="positive">+5.25% Since last week</span>
            </div>
            <div className="card">
              <h3>Orders</h3>
              <p>64</p>
              <span className="negative">-2.25% Since last week</span>
            </div>
          </div>
          <div className="dashboard-charts">
            <h3>Recent Movement</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid stroke="#3a3a3a" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
