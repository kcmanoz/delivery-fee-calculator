import { useForm } from "react-hook-form";
import { FormData } from "../App";

interface FormProps {
  onSubmit: (data: FormData) => void;
}

const FormInput: React.FC<FormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="form-group">
        <label className="form-label" htmlFor="cartValue">
          Cart Value
        </label>
        <input
          {...register("cartValue", {
            required: "Cart value required!",
            valueAsNumber: true,
            validate: (value) =>
              (!isNaN(value) && value > 0) || "Invalid value!",
          })}
          className="form-input"
          type="number"
          name="cartValue"
          data-test-id="cartValue"
        />
      </div>
      {errors.cartValue && (
        <p className="error-message">{errors.cartValue.message}</p>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="distance">
          Delivery Distance
        </label>
        <input
          {...register("distance", {
            required: "Distance required!",
            valueAsNumber: true,
            validate: (value) =>
              (Number.isInteger(value) && value > 0) || "Invalid distance!",
          })}
          className="form-input"
          type="number"
          min="1"
          name="distance"
          data-test-id="deliveryDistance"
        />
      </div>
      {errors.distance && (
        <p className="error-message">{errors.distance.message}</p>
      )}
      <div className="form-group">
        <label className="form-label" htmlFor="amount">
          Number Of Items
        </label>
        <input
          {...register("amount", {
            required: "Number of items required!",
            valueAsNumber: true,
            validate: (value) =>
              (Number.isInteger(value) && value > 0) || "Invalid amount!",
          })}
          className="form-input"
          type="number"
          min="1"
          name="amount"
          data-test-id="numberOfItems"
        />
      </div>
      {errors.amount && (
        <p className="error-message">{errors.amount.message}</p>
      )}
      <div className="form-group">
        <label className="form-label" htmlFor="date">
          Time
        </label>
        <input
          {...register("date", {
            required: "Date & Time is required",
          })}
          className="form-input"
          type="datetime-local"
          name="date"
          data-test-id="orderTime"
        />
      </div>
      {errors.date && <p className="error-message">{errors.date.message}</p>}
      <button
        type="submit"
        className="calculate-button"
        data-test-id="calculateButton"
      >
        Calculate Delivery Price
      </button>
    </form>
  );
};

export default FormInput;
