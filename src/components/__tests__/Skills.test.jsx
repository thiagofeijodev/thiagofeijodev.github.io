import { render, screen } from "@testing-library/react";
import Skills from "../Skills";

describe("Skills", () => {
  test("renders null when skills is empty", () => {
    const { container } = render(<Skills skills={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders Skills heading", () => {
    render(<Skills skills={["React"]} />);
    expect(screen.getByText("Skills")).toBeInTheDocument();
  });

  test("renders each skill as a tag", () => {
    render(<Skills skills={["React", "TypeScript", "Node.js"]} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  test("renders correct number of skill tags", () => {
    const { container } = render(<Skills skills={["A", "B", "C"]} />);
    const tags = container.querySelectorAll("span");
    expect(tags).toHaveLength(3);
  });
});
