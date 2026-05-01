import { render, screen } from "@testing-library/react";
import Projects from "../Projects";

const mockProjects = [
  {
    name: "PDF Password Remover",
    url: "https://pdf-password-remover.feijo.dev/",
  },
  { name: "Countdown Timer", url: "https://countdown.feijo.dev/" },
];

describe("Projects", () => {
  test("renders null when projects is empty", () => {
    const { container } = render(<Projects projects={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders Projects heading", () => {
    render(<Projects projects={mockProjects} />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  test("renders project names as external links", () => {
    render(<Projects projects={mockProjects} />);

    // Items are doubled for the carousel; check the first (real) link
    const pdfLink = screen.getAllByText("PDF Password Remover")[0].closest("a");
    expect(pdfLink).toHaveAttribute(
      "href",
      "https://pdf-password-remover.feijo.dev/",
    );
    expect(pdfLink).toHaveAttribute("target", "_blank");
    expect(pdfLink).toHaveAttribute("rel", "noopener noreferrer");

    const countdownLink = screen
      .getAllByText("Countdown Timer")[0]
      .closest("a");
    expect(countdownLink).toHaveAttribute(
      "href",
      "https://countdown.feijo.dev/",
    );
  });

  test("renders all projects", () => {
    const projects = [
      ...mockProjects,
      { name: "My Blog", url: "https://blog.example.com/" },
    ];
    render(<Projects projects={projects} />);
    expect(screen.getAllByText("My Blog")[0]).toBeInTheDocument();
  });

  test("renders description when provided", () => {
    const projects = [
      {
        name: "My App",
        url: "https://example.com/",
        description: "A cool app.",
      },
    ];
    render(<Projects projects={projects} />);
    expect(screen.getAllByText("A cool app.")[0]).toBeInTheDocument();
  });

  test("duplicate group is aria-hidden for accessibility", () => {
    const { container } = render(<Projects projects={mockProjects} />);
    const groups = container.querySelectorAll("[aria-hidden='true']");
    expect(groups.length).toBeGreaterThanOrEqual(1);
  });
});
