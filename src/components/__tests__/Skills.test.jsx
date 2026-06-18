import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  test("filters skills by search query", async () => {
    const user = userEvent.setup();
    render(<Skills skills={["React", "TypeScript", "Node.js"]} />);

    await user.type(screen.getByLabelText("Search skills"), "type");

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.queryByText("React")).not.toBeInTheDocument();
    expect(screen.queryByText("Node.js")).not.toBeInTheDocument();
  });

  test("shows empty message when no skills match search", async () => {
    const user = userEvent.setup();
    render(<Skills skills={["React"]} />);

    await user.type(screen.getByLabelText("Search skills"), "xyz");

    expect(screen.getByText('No skills match "xyz"')).toBeInTheDocument();
  });
});
