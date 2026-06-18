import { render, screen, fireEvent, act } from "@testing-library/react";
import ScrollIndicator from "../ScrollIndicator";

describe("ScrollIndicator", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.scrollTo = jest.fn();
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      writable: true,
      configurable: true,
    });
    document.body.innerHTML = '<div id="hero" style="height:800px"></div>';
    jest
      .spyOn(document.getElementById("hero"), "getBoundingClientRect")
      .mockReturnValue({
        bottom: 800,
        top: 0,
        height: 800,
      });
  });

  afterEach(() => {
    jest.useRealTimers();
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  test("renders the scroll down indicator", () => {
    render(<ScrollIndicator onClick={jest.fn()} />);
    expect(screen.getByLabelText("Scroll down")).toBeInTheDocument();
    expect(screen.getByText("Scroll Down")).toBeInTheDocument();
  });

  test("calls onClick on click", () => {
    const onClick = jest.fn();
    render(<ScrollIndicator onClick={onClick} />);
    fireEvent.click(screen.getByLabelText("Scroll down"));
    expect(onClick).toHaveBeenCalled();
  });

  test("stays visible during partial hero scroll", () => {
    render(<ScrollIndicator onClick={jest.fn()} />);
    document.getElementById("hero").getBoundingClientRect.mockReturnValue({
      bottom: 600,
      top: -200,
      height: 800,
    });
    fireEvent.scroll(window);
    expect(screen.getByLabelText("Scroll down")).toBeInTheDocument();
  });

  test("hides after scrolling past the hero", () => {
    render(<ScrollIndicator onClick={jest.fn()} />);
    document.getElementById("hero").getBoundingClientRect.mockReturnValue({
      bottom: -50,
      top: -850,
      height: 800,
    });
    fireEvent.scroll(window);
    expect(screen.queryByLabelText("Scroll down")).not.toBeInTheDocument();
  });

  test("auto-scrolls after delay when autoScroll is enabled", () => {
    const onClick = jest.fn();
    render(<ScrollIndicator onClick={onClick} autoScroll />);

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(onClick).toHaveBeenCalled();
  });
});
