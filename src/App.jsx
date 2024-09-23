import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Pricing from './components/Pricing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Slider from './components/Slider';
import Dashboard from './components/Dashboard';
import Orders from './components/orders/Orders';
import Clients from './components/clients/Clients';
import Merchandise from './components/merchandise/Merchandise';
import Courier from './components/couriers/couriers';
import Transport from './components/transports/Transport';
import Venue from './components/venue/Venue';
import MerchandiseCategory from './components/merchandiseCategory/MerchandiseCategory';
import Sidebar from './components/Sidebar';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/pricing" element={<Pricing/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/slider" element={<Slider />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          <Route path="/orders" element={<Orders />} />


          <Route path="/merchandiseCategory" element={< MerchandiseCategory />} />
            
          <Route path="/merchandise" element={<Merchandise />} />
           
                 
          <Route path="/clients" element={<Clients />} />

          <Route path="/couriers" element={<Courier />} />

          <Route path="/venue/:clientId" element={<Venue />} />
          <Route path="/transport" element={<Transport />} />
            

          {/* <Route path="/sidebar" element={<Sidebar />} /> */}


        </Routes>
      </div>
    </Router>
  );
}

export default App;

