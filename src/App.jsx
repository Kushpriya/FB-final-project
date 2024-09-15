import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Pricing from './components/Pricing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Slider from './components/Slider';
import Dashboard from './components/Dashboard';

import Orders from './components/orders/Orders';
import OrderForm from './components/orders/OrderForm';
import OrderList from './components/orders/OrderList';

import Clients from './components/clients/Clients';
import ClientList from './components/clients/ClientList';
import ClientForm from './components/clients/ClientForm';

import MerchandiseForm from './components/merchandise/MerchandiseForm';
import MerchandiseList from './components/merchandise/MerchandiseList';
import Merchandise from './components/merchandise/Merchandise';

import Courier from './components/couriers/couriers';
import CourierForm from './components/couriers/CourierForm';
import CourierList from './components/couriers/CourierList';

import Transport from './components/transports/Transport';
import TransportForm from './components/transports/TransportForm';
import TransportList from './components/transports/TransportList';

import Venue from './components/venue/Venue';
import VenueForm from './components/venue/VenueForm';
import VenueList from './components/venue/VenueList';
import VenueView from './components/venue/VenueView';

import MerchandiseCategory from './components/merchandiseCategory/MerchandiseCategory';
import MerchandiseCategoryList from './components/merchandiseCategory/MerchandiseCategoryList';
import MerchandiseCategoryAdd from './components/merchandiseCategory/MerchandiseCategoryAdd';
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

          <Route path="/orders" element={<Orders />}>
            <Route path="orderform" element={<OrderForm />} />
            <Route path="orderlist" element={<OrderList />} />
          </Route>

          <Route path="/merchandiseCategory" element={< MerchandiseCategory />}>
            <Route path="categoryadd" element={<MerchandiseCategoryAdd/>} />
            <Route path="categorylist" element={<MerchandiseCategoryList />} />
          </Route>

          <Route path="/merchandise" element={<Merchandise />}>
            <Route path="merchandiseform" element={<MerchandiseForm />} />
            <Route path="merchandiselist" element={<MerchandiseList />} />
          </Route>

          <Route path="/clients" element={<Clients />}>
            <Route path="clientform" element={<ClientForm />} />
            <Route path="clientlist" element={<ClientList />} />
          </Route>

          <Route path="/couriers" element={<Courier />}>
            <Route path="courierform" element={<CourierForm/>} />
            <Route path="courierlist" element={<CourierList />} />
          </Route>

          {/* <Route path="/venue" element={<Venue />}>
            <Route path="venueform" element={<VenueForm/>} />
            <Route path="venuelist" element={<VenueList/>} />
            <Route path="venueview" element={<VenueView/>} />
          </Route> */}

          <Route path="/transports" element={<Transport />}>
            <Route path="/transports/transportform" element={<TransportForm/>} />
            <Route path="/transports/transportlist" element={<TransportList />} />
          </Route>

          {/* <Route path="/sidebar" element={<Sidebar />} /> */}


        </Routes>
      </div>
    </Router>
  );
}

export default App;

