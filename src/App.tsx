import { useState } from "react";
import Form from "./Components/FormInput";
import DeliveryFeeTotal from "./Components/DeliveryFeeTotal";
import DeliveryFeeCalculator, {
  DeliveryFeeCalculatorProps,
} from "./Components/DeliveryFeeCalculator";

const App: React.FC = () => {
  const [deliveryFee, setDeliveryFee] = useState<any>();

  const handleDeliveryFee = (data: DeliveryFeeCalculatorProps) => {
    setDeliveryFee(DeliveryFeeCalculator(data));
  };

  return (
    <div className="calculator-container">
      <div className="calculator-form">
        <h3 className="calculator-title">Delivery Fee Calculator</h3>
        <Form onSubmit={handleDeliveryFee} />
        <DeliveryFeeTotal deliveryFee={deliveryFee} />
      </div>
    </div>
  );
};

export default App;
