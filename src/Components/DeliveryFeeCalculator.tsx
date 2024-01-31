export interface DeliveryFeeCalculatorProps {
  cartValue: number;
  distance: number;
  amount: number;
  date: Date;
}

const DeliveryFeeCalculator: React.FC<DeliveryFeeCalculatorProps> = ({
  cartValue,
  distance,
  amount,
  date,
}) => {
  const calculateDeliveryFee = (): number => {
    if (cartValue >= 200) {
      return 0;
    }

    const surCharge = calculateSmallOrderSurcharge(cartValue);
    const distanceFee = calculateDistanceFee(distance);
    const itemSurCharge = calculateItemSurcharge(amount);
    const rushMultiplier = calculateRushMultiplier(date);

    let totalDeliveryFee =
      (surCharge + distanceFee + itemSurCharge) * rushMultiplier;
    totalDeliveryFee = Math.min(totalDeliveryFee, 15);

    return totalDeliveryFee;
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

  return <>{calculateDeliveryFee()}</>;
};

export default DeliveryFeeCalculator;
