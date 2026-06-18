import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BelowFold from "../BelowFold";

jest.mock("../../data/linkedin.json", () => ({
  experience: [
    { title: "Dev", company: "Co", startDate: "Jan 2020", endDate: "Present" },
  ],
  education: [
    { school: "Uni", degree: "BS", startDate: "Jan 2016", endDate: "Dec 2019" },
  ],
  certifications: [{ name: "Cert A", startDate: "Jan 2021" }],
  projects: [
    { title: "Proj", url: "https://example.com", description: "A project" },
  ],
  skills: ["React"],
  posts: [{ title: "Post 1", url: "https://linkedin.com/1", date: "Jan 2024" }],
}));

describe("BelowFold", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <BelowFold />
      </MemoryRouter>,
    );
  });

  test("renders section navigation links", () => {
    expect(
      screen.getByRole("navigation", { name: "Section navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute(
      "href",
      "#experience",
    );
    expect(screen.getByRole("link", { name: "Education" })).toHaveAttribute(
      "href",
      "#education",
    );
    expect(
      screen.getByRole("link", { name: "Certifications" }),
    ).toHaveAttribute("href", "#certifications");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "#projects",
    );
    expect(screen.getByRole("link", { name: "Skills" })).toHaveAttribute(
      "href",
      "#skills",
    );
  });

  test("renders all main section headings", () => {
    expect(
      screen.getByRole("heading", { name: "Experience" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Education" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Certifications" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Projects" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Recent Posts" }),
    ).toBeInTheDocument();
  });
});
