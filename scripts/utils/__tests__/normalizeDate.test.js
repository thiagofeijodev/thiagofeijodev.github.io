import { normalizeDate } from "../normalizeDate.js";

describe("normalizeDate", () => {
  test("returns Present for empty or whitespace", () => {
    expect(normalizeDate("")).toBe("Present");
    expect(normalizeDate("   ")).toBe("Present");
    expect(normalizeDate(undefined)).toBe("Present");
  });

  test("converts ISO YYYY-MM to Mon YYYY", () => {
    expect(normalizeDate("2024-03")).toBe("Mar 2024");
    expect(normalizeDate("2022-01")).toBe("Jan 2022");
  });

  test("passes through already formatted dates", () => {
    expect(normalizeDate("Jan 2024")).toBe("Jan 2024");
    expect(normalizeDate("Dec 2020")).toBe("Dec 2020");
  });

  test("passes through year-only strings", () => {
    expect(normalizeDate("2024")).toBe("2024");
  });

  test("trims input before processing", () => {
    expect(normalizeDate("  2024-06  ")).toBe("Jun 2024");
  });

  test("returns unrecognized formats unchanged", () => {
    expect(normalizeDate("Spring 2020")).toBe("Spring 2020");
  });
});
