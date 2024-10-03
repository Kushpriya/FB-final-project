import React, { useState } from 'react';
import CourierList from '../components/CourierList';
import CourierView from '../components/CourierView';
import './style.css';

const Courier = () => {
  const [viewCourier, setViewCourier] = useState(null); // State to track the selected courier

  // Handler to set the courier for viewing
  const handleView = (courier) => {
    setViewCourier(courier);
  };

  return (
    <div className="courier-container">
      <h1>Couriers List</h1>

      {/* Pass the handleView function as a prop to CourierList */}
      <CourierList handleView={handleView} />

      {/* Render CourierView modal when a courier is selected */}
      {viewCourier && (
        <CourierView viewCourier={viewCourier} setViewCourier={setViewCourier} />
      )}
    </div>
  );
};

export default Courier;
