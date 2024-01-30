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
    const validatedData = validateInputs(data);
    if (validatedData) {
      onSubmit(validatedData);
    }
  };

  const validateInputs = (data: FormData): FormData | null => {
    if (!data.cartValue || !data.distance || !data.amount || !data.date) {
      return null;
    }
    return data;
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

        {errors.cartValue && (
          <p className="error-message">{errors.cartValue.message}</p>
        )}
      </div>

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
        {errors.distance && (
          <p className="error-message">{errors.distance.message}</p>
        )}
      </div>
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
        {errors.amount && (
          <p className="error-message">{errors.amount.message}</p>
        )}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="date">
          Time
        </label>
        <input
          {...register("date", {
            required: "Date & Time is required",
            validate: (value) => {
              const selectedDate = new Date(value);
              const currentDate = new Date();

              return (
                selectedDate > currentDate ||
                "Please select a valid date and time!"
              );
            },
          })}
          className="form-input"
          type="datetime-local"
          name="date"
          data-test-id="orderTime"
        />
        {errors.date && <p className="error-message">{errors.date.message}</p>}
      </div>
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
