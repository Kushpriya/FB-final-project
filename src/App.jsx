import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Venue from './features/venues/pages/Venue';
import './App.css';
import 'ag-grid-community/styles/ag-grid.css';      
import 'ag-grid-community/styles/ag-theme-alpine.css'; 
import ChildrenRecurringOrder from './features/orders/components/ChildrenOrder';
import Category from './features/merchandiseCategories/pages/Category';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Transport from './features/transports/pages/Transport';
import Merchandise from './features/merchandise/pages/Merchandise';
import Client from './features/clients/pages/Client';
import OrderGroup from './features/orders/pages/OrderGroup';
import { APP_URL } from './constants/APP_URL'; 
import Login from './features/login/pages/Login';
import SignUp from './features/signup/SignUp';
import Dashboard from './features/dashboard/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import { useSelector } from 'react-redux';
import SideBar from './components/SideBar/SideBar';
import Navbar from './components/Navbar/Navbar';
import Courier from './features/couriers/pages/courier';

const AppWrapper = () => {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const shouldShowSideBar = token && ![APP_URL.HOME, APP_URL.LOGIN, APP_URL.SIGNUP].includes(location.pathname);


  return (
    <div className="app-container">
      {shouldShowSideBar && <SideBar />}
      <div className={`main-content-container ${shouldShowSideBar ? '' : 'full-width'}`}>
        <Routes>
          <Route path={APP_URL.HOME} element={<Navbar />} />
          <Route path={APP_URL.SIGNUP} element={<SignUp />} />
          <Route path={APP_URL.LOGIN} element={<Login />} />
          <Route element={<PrivateRoute/>}>
          <Route path={APP_URL.DASHBOARD} element={<Dashboard />} />
          <Route path={APP_URL.CATEGORY} element={<Category />} />
          <Route path={APP_URL.MERCHANDISE} element={<Merchandise />} />
          <Route path={APP_URL.CLIENTS} element={<Client />} />
          <Route path={APP_URL.VENUE(':clientId')} element={<Venue />} />
          <Route path={APP_URL.TRANSPORT} element={<Transport />} />
          <Route path={APP_URL.ORDER_GROUP} element={<OrderGroup />} />
          <Route path={APP_URL.CHILDREN_RECURRING_ORDER(':mainRecurringOrderId')} element={<ChildrenRecurringOrder />} />
          <Route path={APP_URL.COURIERS} element={<Courier />} />

          </Route>

        </Routes>
      </div>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
