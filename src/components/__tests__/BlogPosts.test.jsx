import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BlogPosts from "../BlogPosts";

const makePosts = (n) =>
  Array.from({ length: n }, (_, i) => ({
    title: `Post ${i + 1}`,
    url: `https://example.com/post-${i + 1}`,
    date: "Jan 2024",
    excerpt: `Excerpt ${i + 1}`,
  }));

const renderPosts = (posts) =>
  render(
    <MemoryRouter>
      <BlogPosts posts={posts} />
    </MemoryRouter>,
  );

describe("BlogPosts", () => {
  test("renders null when posts is empty", () => {
    const { container } = renderPosts([]);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders Recent Posts heading", () => {
    renderPosts(makePosts(1));
    expect(screen.getByText("Recent Posts")).toBeInTheDocument();
  });

  test("renders up to 3 posts", () => {
    renderPosts(makePosts(5));
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 3")).toBeInTheDocument();
    expect(screen.queryByText("Post 4")).not.toBeInTheDocument();
  });

  test("renders all posts when 3 or fewer", () => {
    renderPosts(makePosts(3));
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
    expect(screen.getByText("Post 3")).toBeInTheDocument();
  });

  test("shows See all posts link when more than 3 posts", () => {
    renderPosts(makePosts(4));
    const link = screen.getByText("See all posts →");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/posts");
  });

  test("does not show See all posts link when 3 or fewer posts", () => {
    renderPosts(makePosts(3));
    expect(screen.queryByText("See all posts →")).not.toBeInTheDocument();
  });

  test("renders post excerpt when provided", () => {
    renderPosts(makePosts(1));
    expect(screen.getByText("Excerpt 1")).toBeInTheDocument();
  });

  test("renders post as external link", () => {
    renderPosts(makePosts(1));
    const link = screen.getByText("Post 1").closest("a");
    expect(link).toHaveAttribute("href", "https://example.com/post-1");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
