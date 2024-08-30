import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Pricing';
import HeroSection from './components/Herosection';
import SignIn from './components/SignIn';
import ProductList from './components/ProductList';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Pricing from './components/Pricing';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Orders />
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/pricing" element={<Pricing/>} />

          {/* <Route path="/herosection" element={<HeroSection />} /> */}
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
