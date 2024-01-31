interface DeliveryFeeTotalProps {
  deliveryFee: number;
}

const DeliveryFeeTotal: React.FC<DeliveryFeeTotalProps> = ({ deliveryFee }) => {
  return (
    <div className="result-container" data-test-id="fee">
      <h3>Delivery Price: {deliveryFee} €</h3>
    </div>
  );
};

export default DeliveryFeeTotal;
