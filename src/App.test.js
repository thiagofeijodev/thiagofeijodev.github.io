import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("./hooks/useSnapScroll", () => () => ({ showBelow: true }));

describe("App Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
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

  test("renders download CV link", () => {
    const link = screen.getByText("Download CV").closest("a");
    expect(link).toHaveAttribute("href", "/cv.pdf");
    expect(link).toHaveAttribute("download");
  });

  test("renders projects section with correct links", async () => {
    expect(
      await screen.findByRole("heading", { name: "Projects" }),
    ).toBeInTheDocument();

    const pdfLink = screen.getAllByText("PDF Password Remover")[0].closest("a");
    const countdownLink = screen
      .getAllByText("Countdown Timer")[0]
      .closest("a");

    expect(pdfLink).toHaveAttribute(
      "href",
      "https://pdf-password-remover.feijo.dev/",
    );
    expect(countdownLink).toHaveAttribute(
      "href",
      "https://countdown.feijo.dev/",
    );
  });
});

describe("App /posts route", () => {
  test("renders the posts page", async () => {
    render(
      <MemoryRouter initialEntries={["/posts"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: "All Posts" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "← Back" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
