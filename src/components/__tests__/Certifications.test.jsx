import { render, screen } from "@testing-library/react";
import Certifications from "../Certifications";

describe("Certifications", () => {
  test("renders null when certifications is empty", () => {
    const { container } = render(<Certifications certifications={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders Certifications heading", () => {
    render(
      <Certifications
        certifications={[{ name: "AWS Cert", startDate: "Jan 2023" }]}
      />,
    );
    expect(screen.getByText("Certifications")).toBeInTheDocument();
  });

  test("renders cert name as a link when url is provided", () => {
    render(
      <Certifications
        certifications={[
          {
            name: "AWS Cert",
            url: "https://aws.example.com",
            startDate: "Jan 2023",
          },
        ]}
      />,
    );
    const link = screen.getByText("AWS Cert");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "https://aws.example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  test("renders cert name as a heading when no url", () => {
    render(
      <Certifications
        certifications={[{ name: "My Cert", startDate: "Jan 2023" }]}
      />,
    );
    const el = screen.getByText("My Cert");
    expect(el.tagName).toBe("H3");
  });

  test("renders authority when provided", () => {
    render(
      <Certifications
        certifications={[
          { name: "Cert", authority: "Certify Inc", startDate: "Jan 2023" },
        ]}
      />,
    );
    expect(screen.getByText("Certify Inc")).toBeInTheDocument();
  });

  test("renders license number when provided", () => {
    render(
      <Certifications
        certifications={[
          { name: "Cert", startDate: "Jan 2023", licenseNumber: "ABC-123" },
        ]}
      />,
    );
    expect(screen.getByText("License: ABC-123")).toBeInTheDocument();
  });

  test("does not render end date when it is Present", () => {
    render(
      <Certifications
        certifications={[
          { name: "Cert", startDate: "Jan 2023", endDate: "Present" },
        ]}
      />,
    );
    expect(screen.getByText("Jan 2023")).toBeInTheDocument();
    expect(screen.queryByText("Present")).not.toBeInTheDocument();
  });

  test("renders end date when not Present", () => {
    render(
      <Certifications
        certifications={[
          { name: "Cert", startDate: "Jan 2023", endDate: "Dec 2024" },
        ]}
      />,
    );
    expect(screen.getByText("Jan 2023 — Dec 2024")).toBeInTheDocument();
  });

  test("sorts certifications by start date descending", () => {
    render(
      <Certifications
        certifications={[
          { name: "Older Cert", startDate: "Jan 2020" },
          { name: "Newer Cert", startDate: "Jun 2024" },
        ]}
      />,
    );
    const titles = screen.getAllByRole("heading", { level: 3 });
    expect(titles[0]).toHaveTextContent("Newer Cert");
    expect(titles[1]).toHaveTextContent("Older Cert");
  });
});
