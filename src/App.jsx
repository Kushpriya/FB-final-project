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
import Products from './components/products/Products';
import ProductList from './components/products/ProductList';
import ProductAdd from './components/products/ProductAdd';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/pricing" element={<Pricing/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/slider" element={<Slider />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/orders" element={<Orders />}>
            <Route path="orderform" element={<OrderForm />} />
            <Route path="orderlist" element={<OrderList />} />
          </Route>

          <Route path="/products" element={<Products />}>
            <Route path="productadd" element={<ProductAdd />} />
            <Route path="productlist" element={<ProductList />} />
          </Route>

          <Route path="/clients" element={<Clients />}>
            <Route path="clientadd" element={<ProductAdd />} />
            <Route path="clientlist" element={<ProductList />} />
          </Route>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
