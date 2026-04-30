import { render, screen, fireEvent } from "@testing-library/react";
import ScrollIndicator from "../ScrollIndicator";

describe("ScrollIndicator", () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  test("renders the scroll down indicator", () => {
    render(<ScrollIndicator />);
    expect(screen.getByLabelText("Scroll down")).toBeInTheDocument();
    expect(screen.getByText("Scroll Down")).toBeInTheDocument();
  });

  test("calls window.scrollTo on click", () => {
    render(<ScrollIndicator />);
    fireEvent.click(screen.getByLabelText("Scroll down"));
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: window.innerHeight,
      behavior: "smooth",
    });
  });

  test("hides when scrolled past 80px", () => {
    render(<ScrollIndicator />);
    Object.defineProperty(window, "scrollY", {
      value: 100,
      writable: true,
      configurable: true,
    });
    fireEvent.scroll(window);
    expect(screen.queryByLabelText("Scroll down")).not.toBeInTheDocument();
  });
});
