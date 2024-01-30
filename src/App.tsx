import React, { useState } from "react";
import Form from "./Components/FormInput";
import DeliveryFeeTotal from "./Components/DeliveryFeeTotal";

export interface FormData {
  cartValue: number;
  distance: number;
  amount: number;
  date: Date;
}

const App: React.FC = () => {
  const [deliveryFee, setDeliveryFee] = useState(0);

  const calculateDeliveryFee = (data: FormData) => {
    const { cartValue, distance, amount, date } = data;

    if (cartValue >= 200) {
      setDeliveryFee(0);
      return;
    }

    const surCharge = calculateSmallOrderSurcharge(cartValue);
    const distanceFee = calculateDistanceFee(distance);
    const itemSurCharge = calculateItemSurcharge(amount);
    const rushMultiplier = calculateRushMultiplier(date);

    let totalDeliveryFee =
      (surCharge + distanceFee + itemSurCharge) * rushMultiplier;
    totalDeliveryFee = Math.min(totalDeliveryFee, 15);

    setDeliveryFee(totalDeliveryFee);
  };

  const calculateSmallOrderSurcharge = (cartValue: number): number => {
    return cartValue < 10 ? 10 - cartValue : 0;
  };

  const calculateDistanceFee = (distance: number): number => {
    const baseFee = 2;
    const additionalFee = Math.ceil(Math.max(0, (distance - 1000) / 500));
    return baseFee + additionalFee;
  };

  const calculateItemSurcharge = (amount: number): number => {
    if (amount >= 5 && amount <= 12) {
      return (amount - 4) * 0.5;
    } else if (amount > 12) {
      return (amount - 4) * 0.5 + 1.2;
    }
    return 0;
  };

  const calculateRushMultiplier = (date: Date): number => {
    const deliveryDate = new Date(date);
    const day = deliveryDate.getDay();
    const hours = deliveryDate.getHours();

    return day === 5 && hours >= 15 && hours < 19 ? 1.2 : 1;
  };

  return (
    <div className="calculator-container">
      <div className="calculator-form">
        <h3 className="calculator-title">Delivery Fee Calculator</h3>
        <Form onSubmit={calculateDeliveryFee} />
        <DeliveryFeeTotal deliveryFee={deliveryFee} />
      </div>
    </div>
  );
};

export default App;
