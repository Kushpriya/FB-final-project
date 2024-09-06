import React, { useState } from "react";
import CourierForm from "./CourierForm";
import CourierList from "./CourierList";
import Slider from '../../components/Slider';


const Courier = () => {
  const [couriers, setCouriers] = useState([]);

  const addCourier = (courier) => {
    setCouriers([...couriers, courier]);
  };

  return (
    <div>
      <Slider />

      <CourierForm addCourier={addCourier} />
      <CourierList couriers={couriers} />
    </div>
  );
};

export default Courier;