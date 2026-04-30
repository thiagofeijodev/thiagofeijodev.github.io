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

    const pdfLink = screen.getByText("PDF Password Remover").closest("a");
    expect(pdfLink).toHaveAttribute(
      "href",
      "https://pdf-password-remover.feijo.dev/",
    );
    expect(pdfLink).toHaveAttribute("target", "_blank");
    expect(pdfLink).toHaveAttribute("rel", "noopener noreferrer");

    const countdownLink = screen.getByText("Countdown Timer").closest("a");
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
    expect(screen.getByText("My Blog")).toBeInTheDocument();
  });
});
