import { render } from "@testing-library/react";
import DeliveryFeeCalculator from "../Components/DeliveryFeeCalculator";

describe("DeliveryFeeCalculator", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <DeliveryFeeCalculator
        cartValue={0}
        distance={0}
        amount={0}
        date={new Date()}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
