import { splitCommentary } from "../splitCommentary.js";

describe("splitCommentary", () => {
  test("returns empty title and excerpt for empty input", () => {
    expect(splitCommentary("")).toEqual({ title: "", excerpt: "" });
    expect(splitCommentary(null)).toEqual({ title: "", excerpt: "" });
    expect(splitCommentary(undefined)).toEqual({ title: "", excerpt: "" });
  });

  test("returns full text as title when 80 characters or fewer", () => {
    const text = "Short post text.";
    expect(splitCommentary(text)).toEqual({ title: text, excerpt: "" });
  });

  test("splits at sentence boundary when within 120 characters", () => {
    const text = "Hello world. This is the rest of the post.";
    expect(splitCommentary(text)).toEqual({
      title: "Hello world.",
      excerpt: "This is the rest of the post.",
    });
  });

  test("splits at word boundary near 80 characters when no early sentence", () => {
    const text =
      "This is a very long post without an early sentence break that exceeds eighty characters easily";
    const result = splitCommentary(text);
    expect(result.title.length).toBeLessThanOrEqual(80);
    expect(result.title).toBe(
      "This is a very long post without an early sentence break that exceeds eighty",
    );
    expect(result.excerpt).toBe("characters easily");
  });

  test("trims input before processing", () => {
    expect(splitCommentary("  Hello. World.  ")).toEqual({
      title: "Hello.",
      excerpt: "World.",
    });
  });
});
