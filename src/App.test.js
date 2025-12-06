import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("renders main heading and role", () => {
    expect(screen.getByText("Thiago Feijó")).toBeInTheDocument();
    expect(screen.getByText("Software Developer")).toBeInTheDocument();
  });

  test("renders avatar with correct attributes", () => {
    const avatar = screen.getByAltText("avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute(
      "src",
      "https://avatars.githubusercontent.com/u/17260775",
    );
  });

  test("renders social links with correct attributes", () => {
    const githubLink = screen.getByLabelText("Github");
    const linkedinLink = screen.getByLabelText("LinkedIn");

    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/thiagofeijodev/",
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noreferrer");

    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/thiagofeijodev/",
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noreferrer");
  });

  test("renders projects section with correct links", () => {
    expect(screen.getByText("Projects")).toBeInTheDocument();

    const pdfLink = screen.getByText("PDF Password Remover").closest("a");
    const countdownLink = screen.getByText("Countdown Timer").closest("a");

    expect(pdfLink).toHaveAttribute("href", "/pdf-password-remover/");
    expect(countdownLink).toHaveAttribute("href", "/countdown/");
  });
});
