// Constants value as per provided specification
const SMALL_ORDER_THRESHOLD = 10;
const BASE_FEE = 2;
const ADDITIONAL_FEE_INTERVAL = 500;
const RUSH_MULTIPLIER = 1.2;
const MAX_DELIVERY_FEE = 15;
const BULK_ITEM_THRESHOLD = 4;
const BULK_SURCHARGE = 0.5;
const BULK_FEE_THRESHOLD = 12;
const BULK_FEE = 1.2;

enum Day {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

enum Hour {
  START = 15,
  END = 19,
}

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
  // Calculate small order surcharge
  const calculateSmallOrderSurcharge = (cartValue: number): number => {
    return cartValue < SMALL_ORDER_THRESHOLD
      ? SMALL_ORDER_THRESHOLD - cartValue
      : 0;
  };

  // Calculate distance fee
  const calculateDistanceFee = (distance: number): number => {
    const additionalFee = Math.ceil(
      Math.max(0, (distance - 1000) / ADDITIONAL_FEE_INTERVAL)
    );
    return BASE_FEE + additionalFee;
  };

  // Calculate item surcharge
  const calculateItemSurcharge = (amount: number): number => {
    if (amount > BULK_ITEM_THRESHOLD) {
      return (
        (amount - BULK_ITEM_THRESHOLD) * BULK_SURCHARGE +
        (amount > BULK_FEE_THRESHOLD ? BULK_FEE : 0)
      );
    }
    return 0;
  };

  // Calculate rush multiplier
  const calculateRushMultiplier = (date: Date): number => {
    const deliveryDate = new Date(date);
    const day = deliveryDate.getDay();
    const hours = deliveryDate.getHours();

    return day === Day.FRIDAY && hours >= Hour.START && hours < Hour.END
      ? RUSH_MULTIPLIER
      : 1;
  };

  // Calculate total delivery fee
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
    totalDeliveryFee = Math.min(totalDeliveryFee, MAX_DELIVERY_FEE);

    return totalDeliveryFee;
  };

  return <>{calculateDeliveryFee()}</>;
};

export default DeliveryFeeCalculator;
