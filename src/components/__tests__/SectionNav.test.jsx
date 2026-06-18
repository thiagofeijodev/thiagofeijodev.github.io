import { render, screen } from "@testing-library/react";
import SectionNav from "../SectionNav";

describe("SectionNav", () => {
  test("renders navigation with accessible label", () => {
    render(<SectionNav />);
    expect(
      screen.getByRole("navigation", { name: "Section navigation" }),
    ).toBeInTheDocument();
  });

  test("renders links to all sections", () => {
    render(<SectionNav />);
    const sections = [
      { label: "Experience", href: "#experience" },
      { label: "Education", href: "#education" },
      { label: "Certifications", href: "#certifications" },
      { label: "Projects", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Recent Posts", href: "#posts" },
    ];

    sections.forEach(({ label, href }) => {
      const link = screen.getByText(label).closest("a");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    });
  });

  test("renders exactly 6 section links", () => {
    render(<SectionNav />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(6);
  });
});
