import { render, screen } from "@testing-library/react";
import Education from "../Education";

const mockEducation = [
  {
    school: "University of Lisbon",
    degree: "BSc Computer Science",
    startDate: "Sep 2015",
    endDate: "Jun 2019",
    notes: "Honours degree.",
  },
];

describe("Education", () => {
  test("renders null when education is empty", () => {
    const { container } = render(<Education education={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders Education heading", () => {
    render(<Education education={mockEducation} />);
    expect(screen.getByText("Education")).toBeInTheDocument();
  });

  test("renders school and degree", () => {
    render(<Education education={mockEducation} />);
    expect(screen.getByText("University of Lisbon")).toBeInTheDocument();
    expect(screen.getByText("BSc Computer Science")).toBeInTheDocument();
  });

  test("renders dates", () => {
    render(<Education education={mockEducation} />);
    expect(screen.getByText("Sep 2015 — Jun 2019")).toBeInTheDocument();
  });

  test("renders notes when provided", () => {
    render(<Education education={mockEducation} />);
    expect(screen.getByText("Honours degree.")).toBeInTheDocument();
  });

  test("does not render degree when omitted", () => {
    render(
      <Education
        education={[
          { school: "MIT", startDate: "Sep 2015", endDate: "Jun 2019" },
        ]}
      />,
    );
    expect(screen.queryByText("BSc Computer Science")).not.toBeInTheDocument();
  });

  test("renders multiple entries", () => {
    const education = [
      ...mockEducation,
      {
        school: "Codecademy",
        degree: "Web Dev",
        startDate: "Jan 2020",
        endDate: "Dec 2020",
      },
    ];
    render(<Education education={education} />);
    expect(screen.getByText("Codecademy")).toBeInTheDocument();
    expect(screen.getByText("Web Dev")).toBeInTheDocument();
  });
});
