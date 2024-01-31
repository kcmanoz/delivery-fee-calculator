import { render, screen, fireEvent } from "@testing-library/react";
import FormInput from "../Components/FormInput";

describe("FormInput", () => {
  it("renders with default props", () => {
    const onSubmit = jest.fn();
    const { container } = render(<FormInput onSubmit={onSubmit} />);
    expect(container).toMatchSnapshot();
  });

  it("submits the form with valid data", () => {
    const onSubmit = jest.fn();
    render(<FormInput onSubmit={onSubmit} />);

    fireEvent.change(screen.getByTestId("cartValue"), {
      target: { value: "15" },
    });
    fireEvent.change(screen.getByTestId("deliveryDistance"), {
      target: { value: "1501" },
    });
    fireEvent.change(screen.getByTestId("numberOfItems"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByTestId("orderTime"), {
      target: { value: "2024-01-31T15:30" },
    });

    fireEvent.click(screen.getByTestId("calculateButton"));

    expect(onSubmit).toHaveBeenCalledWith({
      cartValue: 15,
      distance: 1501,
      amount: 10,
      date: new Date("2024-01-31T15:30"),
    });
  });

  it("displays error messages for invalid data", () => {
    render(<FormInput onSubmit={() => {}} />);

    fireEvent.click(screen.getByTestId("calculateButton"));

    expect(screen.getByText("Cart value required!")).toBeInTheDocument();
    expect(screen.getByText("Distance required!")).toBeInTheDocument();
    expect(screen.getByText("Number of items required!")).toBeInTheDocument();
    expect(screen.getByText("Date & Time is required")).toBeInTheDocument();
  });
});
