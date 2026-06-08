import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Posts from "../Posts";

jest.mock("../../data/linkedin.json", () => ({
  posts: [
    {
      title: "Post One",
      url: "https://linkedin.com/post/1",
      date: "Jan 2024",
      excerpt: "First excerpt.",
    },
    { title: "Post Two", url: "https://linkedin.com/post/2", date: "Feb 2024" },
  ],
}));

describe("Posts page", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Posts />
      </MemoryRouter>,
    );
  });

  test("renders All Posts heading", () => {
    expect(screen.getByText("All Posts")).toBeInTheDocument();
  });

  test("renders back link to home", () => {
    const back = screen.getByText("← Back").closest("a");
    expect(back).toHaveAttribute("href", "/");
  });

  test("renders all posts", () => {
    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.getByText("Post Two")).toBeInTheDocument();
  });

  test("renders post as external link", () => {
    const link = screen.getByText("Post One").closest("a");
    expect(link).toHaveAttribute("href", "https://linkedin.com/post/1");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("renders excerpt when provided", () => {
    expect(screen.getByText("First excerpt.")).toBeInTheDocument();
  });

  test("renders post date", () => {
    expect(screen.getByText("Jan 2024")).toBeInTheDocument();
  });
});
