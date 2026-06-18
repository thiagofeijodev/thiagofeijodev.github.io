import { render, screen } from "@testing-library/react";
import Spinner from "../Spinner";

describe("Spinner", () => {
  test("renders loading indicator with accessible label", () => {
    render(<Spinner />);
    expect(screen.getByLabelText("Loading content")).toBeInTheDocument();
  });
});
