import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import HeroSection from './components/Herosection';
import SignIn from './components/SignIn';
import ProductList from './components/ProductList';
// import '../src/assets/css/ProductList.css';

function App() {
  return (
    <div className="App">
       
      <Navbar />
      <Header />
       <HeroSection />
       <SignIn />

       <ProductList />
    </div>
  );
}

export default App;
