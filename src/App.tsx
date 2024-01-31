import { useState } from "react";
import Form from "./Components/FormInput";
import DeliveryFeeTotal from "./Components/DeliveryFeeTotal";
import DeliveryFeeCalculator, {
  DeliveryFeeCalculatorProps,
} from "./Components/DeliveryFeeCalculator";

const App: React.FC = () => {
  const [deliveryFee, setDeliveryFee] = useState<any>(0);

  const DeliveryFee = (data: DeliveryFeeCalculatorProps) => {
    const { cartValue, distance, amount, date } = data;
    const calculatedFee = DeliveryFeeCalculator({
      cartValue,
      distance,
      amount,
      date,
    });
    setDeliveryFee(calculatedFee);
  };

  return (
    <div className="calculator-container">
      <div className="calculator-form">
        <h3 className="calculator-title">Delivery Fee Calculator</h3>
        <Form onSubmit={DeliveryFee} />
        <DeliveryFeeTotal deliveryFee={deliveryFee} />
      </div>
    </div>
  );
};

export default App;
