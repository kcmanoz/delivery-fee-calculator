import { render, screen } from "@testing-library/react";
import DeliveryFeeTotal from "../Components/DeliveryFeeTotal";

describe("DeliveryFeeTotal", () => {
  it("renders with default props", () => {
    const { container } = render(<DeliveryFeeTotal deliveryFee={0} />);
    expect(container).toMatchSnapshot();
  });

  it("displays the correct delivery fee", () => {
    render(<DeliveryFeeTotal deliveryFee={8} />);
    const deliveryFeeElement = screen.getByTestId("fee");
    expect(deliveryFeeElement.textContent).toBe("Delivery Price: 8 €");
  });
});
