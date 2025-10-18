import { render } from "@testing-library/react";
import SVGLinkdin from "../SVGLinkdin";

describe("SVGLinkdin Component", () => {
  test("renders with correct attributes", () => {
    const { container } = render(<SVGLinkdin alt="LinkedIn icon" />);
    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
    expect(svg).toHaveAttribute("viewBox", "0 0 32 32");
    expect(svg).toHaveAttribute("fill", "none");
  });
});
