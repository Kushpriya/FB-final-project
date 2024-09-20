import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Slider from './components/Slider';
import Dashboard from './components/Dashboard';
import Clients from './components/clients/Clients';
import Merchandise from './components/merchandise/Merchandise';
import Transport from './components/transports/Transport';
import Venue from './components/venue/Venue';
import MerchandiseCategory from './components/merchandiseCategory/MerchandiseCategory';
import OrderGroup from './components/orders/OrderGroup';
import './App.css';
import 'ag-grid-community/styles/ag-grid.css';      
import 'ag-grid-community/styles/ag-theme-alpine.css'; 

const AppWrapper = () => {
  const location = useLocation();

  const shouldShowSlider = !['/', '/signin', '/signup'].includes(location.pathname);


  return (
    <div className="app-container" >
      {shouldShowSlider && <Slider/>}
      <div className={`main-content-container ${shouldShowSlider ? '' : 'full-width'}`}>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/merchandiseCategory" element={<MerchandiseCategory />} />
          <Route path="/merchandise" element={<Merchandise />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/venue/:clientId" element={<Venue />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/ordergroup" element={<OrderGroup />} />
        </Routes>
      </div>
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
