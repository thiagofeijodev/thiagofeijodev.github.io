import { render, screen } from "@testing-library/react";
import CV from "../CV";

const mockExperience = [
  {
    title: "Senior Engineer",
    company: "Acme Corp",
    startDate: "Jan 2023",
    endDate: "Present",
    description: "Led the frontend team.",
  },
];

describe("CV", () => {
  test("renders null when experience is empty", () => {
    const { container } = render(<CV experience={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders Experience heading", () => {
    render(<CV experience={mockExperience} />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  test("renders job title and company", () => {
    render(<CV experience={mockExperience} />);
    expect(screen.getByText("Senior Engineer")).toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
  });

  test("renders dates", () => {
    render(<CV experience={mockExperience} />);
    expect(screen.getByText("Jan 2023 — Present")).toBeInTheDocument();
  });

  test("renders description when provided", () => {
    render(<CV experience={mockExperience} />);
    expect(screen.getByText("Led the frontend team.")).toBeInTheDocument();
  });

  test("does not render description when omitted", () => {
    const noDesc = [
      {
        title: "Dev",
        company: "Corp",
        startDate: "Jan 2022",
        endDate: "Dec 2022",
      },
    ];
    render(<CV experience={noDesc} />);
    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });

  test("renders multiple entries", () => {
    const experience = [
      ...mockExperience,
      {
        title: "Junior Dev",
        company: "StartupCo",
        startDate: "Jan 2021",
        endDate: "Dec 2022",
      },
    ];
    render(<CV experience={experience} />);
    expect(screen.getByText("Junior Dev")).toBeInTheDocument();
    expect(screen.getByText("StartupCo")).toBeInTheDocument();
  });
});
